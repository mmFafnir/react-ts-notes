
import React, { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { types } from '../../components/FormCreateNote';
import { WIDTH__NOTE_OPEN } from '../../components/FormEditingNotes';
import { DeleteTrashNotes, RestoreTrashNotes } from '../../store/action-creators/trash';
import INote from '../../types/note';
import ITaskNote, { ITask } from '../../types/task';

import Task from '../../components/Task';

interface IProps {
    note: INote|ITaskNote;
    setCurrentNote: () => void;
}

const EditForm:FC<IProps> = ({
    note,setCurrentNote
}) => {


    const dispatch = useDispatch<any>();

    const noteDOM = document.getElementById(note.id);
    const rect = noteDOM?.getBoundingClientRect();

    const animStart = {
        maxWidth: `${rect?.width}px`,
        left: `${rect?.left}px`,
        top: `${rect?.top}px`,
    }
    const animFinish = {
        left: (window.innerWidth > 700) ? `${(window.innerWidth/2 - WIDTH__NOTE_OPEN/2) - 8}px` : `0px`,
        top: `80px`,
        maxWidth: `${WIDTH__NOTE_OPEN}px`
    }

    const [animState, setAnimState] = useState<{}>(animStart) 

    const animShow = () => {
        if(noteDOM) {
            noteDOM.style.opacity = '0';
        }
        setAnimState(animFinish)
        setTimeout(() => {
            setAnimState({
                position: 'relative',
                maxWidth: `${WIDTH__NOTE_OPEN}px`
            })
        },500)
        return
    }

    const animCloseNote = (callback?:() => void) => {
        setAnimState(animFinish)
        setTimeout(() => {
            setAnimState({
                position: 'absolute',
                ...animStart 
            })
        }, 10)
        setTimeout(() => {
            if(noteDOM) {
                noteDOM.style.opacity = '1';
            }
            setCurrentNote()

            if(!callback) return
            callback()
        }, 500)
    }    

    const restoreNote = () => {
        animCloseNote(dispatch(RestoreTrashNotes(note)))
    }
    
    const deleteNote = () => {
        animCloseNote(dispatch(DeleteTrashNotes(note.id)))
    }

    useEffect(() => {
        setTimeout(animShow, 300)
    }, [])

    return (
        <div className='edit-note' onClick={(e) => {
            const target = e.target as HTMLElement; 
            if(target.classList.contains('edit-note')) {
                animCloseNote()
            }
        }}>
            <div className="edit-note__wrapper note__wrapper" style={{backgroundColor: note.color, ...animState} }>
                    <div className="edit-note__header notes__header note__header">
                        <div className="edit-note__title">
                            <input 
                                className='note__title ' 
                                type="text" 
                                name='title'
                                defaultValue={note.title} 
                            />
                        </div>
                    </div>
                    <div className="edit-note__body note__body">
                            { 
                                (note.type === types.NOTE) ? (
                                    <p>
                                        {note.text}
                                    </p>
                                ) : (
                                    note.tasks.map((task: ITask) => (
                                        <div className='mask-task'>
                                            <Task value={task.value} checked={task.checked} id={task.id} />
                                        </div>
                                    ))
                                )
                            }
                        <time></time>
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
                        
                        <div>
                            <button
                                onClick={() => animCloseNote()}
                                className='edit-note__close note__close'

                            >Закрыть</button>
                        </div>
                    </div>
                
            </div>
        </div>
    );
};

export default EditForm;