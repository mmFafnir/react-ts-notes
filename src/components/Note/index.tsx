import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteNotes, PutNotes } from '../../store/action-creators/notes';
import { deleteTasks, PutTasks } from '../../store/action-creators/tasks';
import IImg from '../../types/img';
import INote from '../../types/note';
import ITaskNote, { ITask } from '../../types/task';
import ActionNote from '../ActionNote';
import { types } from '../FormCreateNote';
import ImagesBlock from '../ImagesBlock';
import ModalColor from '../ModalColor';
import Task from '../Task';
import FixedIcon from '../UI/FixedIcon';
import Textarea from '../UI/Textarea';

import './note.scss';



interface IProps {
    // id: string;
    // title: string,
    // text?: string;
    // tasks?: ITask[];
    // time: string|number,
    // color?: string,
    // change?: string|number,
    // type: string,
    // images?: IImg[],
    // fixed?: boolean
    note: INote|ITaskNote,
    checkedNotes: string[],
    setCheckedNotes:(note:string[]) => void;
    setCurrentNote:(note: (ITaskNote|INote)|null) => void; 
    changeContent: (note: ITaskNote|INote) => void
}

export const WIDTH__NOTE = 370;

const Note:FC<IProps> = ({
    // id, text = '', time, title, color='#fff', change, type = types.NOTE, tasks = [], images = [], fixed = false,
    note,
    checkedNotes, setCheckedNotes, setCurrentNote, changeContent, 
}) => {
    

    const [width, setwidth] = useState<number>(WIDTH__NOTE);
    const [checked, setChecked] = useState<boolean>(false)

    const [currentTitle, setCurrentTitle] = useState<string>(note.title)     
    const [imagesValues, setImagesValues] = useState<IImg[]>(note.images);
    const [currentFixed, setCurrentFixed] = useState<boolean>(note.fixed)
    
    const [reset, setReset] = useState<boolean>(false);
    
    const [modalColorOpen, setModalColorOpen] = useState<boolean>(false);
    const [currentColor, setCurrentColor] = useState<string>(note.color)

    const placeholder =  'Текст заметки'; 

    const dispatch = useDispatch<any>()

    const deleteNote = () => {
        if(note.type == types.NOTE) {
            dispatch(deleteNotes(note.id))
        }
        if(note.type == types.TASK) {
            dispatch(deleteTasks(note.id))
        }
    }

    const hadnletCheckedNote = () => {
        setChecked(!checked)
    }
    
    const openNote = () => {
        if(note.type === types.NOTE) {
            setCurrentNote(getCurrentNoteText())
        }
        if(note.type == types.TASK) {
            setCurrentNote(getCurrentNoteTasks())
        }
    }

    const getCurrentNoteText = ():INote => {
            return {
                id: note.id,
                title: note.title,
                text: note.text ? note.text : '',
                time: note.time,
                type: note.type,
                color: currentColor,
                fixed: currentFixed,
                images: note.images 
            }
    }

    const getCurrentNoteTasks = ():ITaskNote => {
        return {
            id: note.id,
            tasks: note.tasks, 
            title: note.title,
            time:note.time,
            type:note.type,
            color: currentColor,
            fixed:currentFixed,
            images: note.images 
        }
    }
    
    useEffect(() => {
        if(checked){
            setCheckedNotes(
                (checkedNotes.length > 0) ? [...checkedNotes, note.id] : [note.id]
            )
        }else{
            setCheckedNotes(
                checkedNotes.filter((noteId: string) => noteId !== note.id)
            )
        }     
    }, [checked])

    useEffect(() => {
        if(checkedNotes.length == 0) {
            setChecked(false);
        }
    }, [checkedNotes])

    useEffect(() => {
        setCurrentColor(note.color);
    }, [note.color])
    
    useEffect(() => { 
        setCurrentTitle(note.title)
    }, [note.title])

    useEffect(() => {
        if(note.type === types.NOTE) {
            changeContent(getCurrentNoteText())
            dispatch(PutNotes(note.id, getCurrentNoteText()))
        }
        if(note.type === types.TASK) {
            changeContent(getCurrentNoteTasks())
            dispatch(PutTasks(note.id, getCurrentNoteTasks()))
        }
        
    }, [currentFixed])
        

    return (
        <div id={note.id} className={`note ${checked ?  'checked' : ''}`} style={{width:`${WIDTH__NOTE}px`}}> 
            
            <button
                onClick={hadnletCheckedNote} 
                className={`note__btn-check `}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path d="M438.6 105.4C451.1 117.9 451.1 138.1 438.6 150.6L182.6 406.6C170.1 419.1 149.9 419.1 137.4 406.6L9.372 278.6C-3.124 266.1-3.124 245.9 9.372 233.4C21.87 220.9 42.13 220.9 54.63 233.4L159.1 338.7L393.4 105.4C405.9 92.88 426.1 92.88 438.6 105.4H438.6z"/>
                </svg>
            </button>

            <FixedIcon defaultFixed={note.fixed} getValue={setCurrentFixed} classes={['note__fixed-icon']}/>

            <button
                onClick={(checkedNotes.length > 0) ? hadnletCheckedNote : openNote} 
                className="note__mask"
            ></button>
            
            <div className="note__wrapper" style={{backgroundColor: currentColor, width:`${width}px`}}>
                
                <ImagesBlock setImages={setImagesValues} images={imagesValues} />
                
                <div className="note__header">
                    <input className='note__title' type="text" value={currentTitle} name='title'/>
                </div>
                <div className="note__body">
                    {
                        
                        (note.type === types.NOTE) ? (
                            <Textarea
                                classes={["note__textarea"]}
                                placeholder={placeholder}
                                valueDef={note.text} 
                                setReset={setReset}
                                reset={reset}
                                getValue={(value) => {}}
                            />
                        ) : (
                            note.tasks.map((task: ITask) => {
                                return <Task 
                                    key={task.id} 
                                    id={task.id} 
                                    value={task.value} 
                                    checked={task.checked} 
                                    handlerCheck={(checked: boolean) => {}} 
                                />
                            })
                        )
                    }
                </div>
                <div className="note__footer">
                    <div>
                        <ActionNote
                            setModalColorOpen={setModalColorOpen}
                            modalColorOpen={modalColorOpen}
                            setImages={setImagesValues}
                            images={imagesValues}
                        />
                        <button
                            onClick={deleteNote}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                <path d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM394.8 466.1C393.2 492.3 372.3 512 346.9 512H101.1C75.75 512 54.77 492.3 53.19 466.1L31.1 128H416L394.8 466.1z"/>
                            </svg>
                        </button>
                    </div>
                    <div>
                        
                    </div>
                </div>
                {
                    modalColorOpen ? <ModalColor getColor={setCurrentColor} /> : null
                } 
            </div>
        </div>
    );
};

export default Note;