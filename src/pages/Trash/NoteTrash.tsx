
import React, { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { types } from '../../components/FormCreateNote';
import ImagesBlock from '../../components/ImagesBlock';
import Task from '../../components/Task';
import { useTypeSelector } from '../../hooks/useTypeSelector';
import { msToDay } from '../../script/Date';
import { DeleteTrashNotes, RestoreTrashNotes } from '../../store/action-creators/trash';
import { CheckedNotesActionTypes } from '../../store/reducer/CheckedNotesReducer/CheckedNotesInterface';

import INote from '../../types/note';
import ITaskNote, { ITask } from '../../types/task';

interface IProps {
    note: INote|ITaskNote;
}

const NoteTrash:FC<IProps> = ({note}) => {

    const dispatch = useDispatch<any>()

    const checkedNotes =  useTypeSelector(state => state.checkedNotes);

    const listStyle = useTypeSelector(state => state.listStyle)

    const [checked , setChecked] = useState<boolean>(false);

    const restoreNote = () => {
        dispatch(RestoreTrashNotes(note))
    }
    
    const deleteNote = () => {
        dispatch(DeleteTrashNotes(note.id))
    }
    
    const hadnletCheckedNote = () => {
        setChecked(!checked)
    }

    const expiryDeleteHandler = () => {
        const currentDate = Date.now();
        const ms = currentDate - Number(note.change);
        const days = msToDay(ms);
        if(days < 7) return 
        deleteNote()
    }

    useEffect(() => {
        if(checked){
            dispatch({
                type: CheckedNotesActionTypes.ADD_NOTE,
                payload: note.id
            })
        }else{
            dispatch({
                type: CheckedNotesActionTypes.REMOVE_NOTE,
                payload: note.id
            })
        }     
    }, [checked])

    useEffect(() => {
        if(checkedNotes.length === 0) {
            setChecked(false);
        }
    }, [checkedNotes])


    useEffect(() => {
        const noteDom = document.getElementById(note.id);
        if(!noteDom) return
        if(noteDom.parentElement && noteDom.parentElement.style.opacity === '0') {
            noteDom.parentElement.style.opacity = '1'
        }
        expiryDeleteHandler()
    }, [])

    return (

        <div id={note.id} className={`note trash-note ${checked ?  'checked' : ''}`} style={{width:listStyle.width}}> 
                
            <button
                onClick={hadnletCheckedNote} 
                className={`note__btn-check `}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path d="M438.6 105.4C451.1 117.9 451.1 138.1 438.6 150.6L182.6 406.6C170.1 419.1 149.9 419.1 137.4 406.6L9.372 278.6C-3.124 266.1-3.124 245.9 9.372 233.4C21.87 220.9 42.13 220.9 54.63 233.4L159.1 338.7L393.4 105.4C405.9 92.88 426.1 92.88 438.6 105.4H438.6z"/>
                </svg>
            </button>


            <button
                onClick={(checkedNotes.length > 0) ? hadnletCheckedNote : () => {}} 
                className="note__mask"
            ></button>
            
            <div className="note__wrapper" style={{backgroundColor: note.color, width:listStyle.width}}>
                
                <ImagesBlock  images={note.images ? note.images: []} />
                
                <div className="note__header">
                    <input className='note__title' type="text" defaultValue={note.title} name='title' placeholder='Заголовок'/>
                </div>
                <div className="note__body">
                    {
                        
                        (note.type === types.NOTE) ? (
                            <textarea style={{resize: 'none', overflow: 'hidden'}} defaultValue={note.text} placeholder='Текст Заметки'>
                                
                            </textarea>
                        ) : (
                            note.tasks ? note.tasks.map((task: ITask) => {
                                return <Task 
                                    key={task.id} 
                                    id={task.id} 
                                    value={task.value} 
                                    checked={task.checked} 
                                    handlerCheck={(checked: boolean) => {}} 
                                />
                            }) : <></>
                        )
                    }
                </div>
                <div className="note__footer">
                    <div className='trash-actions'>
                        <button onClick={restoreNote} className='remove-trash'>
                            <svg className='arrow' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                                <path d="M310.6 182.6c-12.51 12.51-32.76 12.49-45.25 0L192 109.3V480c0 17.69-14.31 32-32 32s-32-14.31-32-32V109.3L54.63 182.6c-12.5 12.5-32.75 12.5-45.25 0s-12.5-32.75 0-45.25l128-128c12.5-12.5 32.75-12.5 45.25 0l128 128C323.1 149.9 323.1 170.1 310.6 182.6z"/>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                <path d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM394.8 466.1C393.2 492.3 372.3 512 346.9 512H101.1C75.75 512 54.77 492.3 53.19 466.1L31.1 128H416L394.8 466.1z"></path>
                            </svg>
                        </button>

                        <button onClick={deleteNote} className='delete-trash'>
                            <svg className='x' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                                <path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"/>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                <path d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM394.8 466.1C393.2 492.3 372.3 512 346.9 512H101.1C75.75 512 54.77 492.3 53.19 466.1L31.1 128H416L394.8 466.1z"></path>
                            </svg>    
                        </button>              
                    </div>
                    <div></div>
                </div>
                
            </div>
        </div>

    );
};

export default NoteTrash;