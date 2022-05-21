import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteNotes, PutNotes } from '../../store/action-creators/notes';
import { deleteTasks, PutTasks } from '../../store/action-creators/tasks';
import IImg from '../../types/img';
import INote from '../../types/note';
import { ITask } from '../../types/task';
import ActionNote from '../ActionNote';
import { types } from '../CreateNote';
import ImagesBlock from '../ImagesBlock';
import ModalColor from '../ModalColor';
import Task from '../Task';
import Textarea from '../UI/Textarea';

import './note.scss';

const WIDTH__NOTE = 305;
const WIDTH__NOTE_OPEN = 700;

interface IProps {
    id: string;
    title: string,
    text?: string;
    tasks?: ITask[];
    time: string|number,
    color?: string,
    change?: string|number,
    type?: string,
    images?: IImg[],
    checkedNotes: string[],
    setCheckedNotes:(note:string[]) => void
}

const Note:FC<IProps> = ({
    id, text, time, title, color='#fff', change, type, tasks, images = [],
    checkedNotes, setCheckedNotes 
}) => {


    const [width, setwidth] = useState<number>(WIDTH__NOTE);
    const [checked, setChecked] = useState<boolean>(false)

    const [currentTitle, setCurrentTitle] = useState<string>(title)     

    const [textValue, setTextValue] = useState<string>(text ? text : '');
    const [tasksValue,setTasksValue] = useState<ITask[]>(tasks ? tasks : []);
    const [imagesValues, setImagesValues] = useState<IImg[]>(images);
    
    const [reset, setReset] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    
    const [modalColorOpen, setModalColorOpen] = useState<boolean>(false);
    const [currentColor, setCurrentColor] = useState<string>(color)

    const placeholder = open ? 'Текст заметоки' : '';
     
    const [valueLenght, setValueLenght] = useState<number>(0);
    const [disabled, setDisabled] = useState<boolean>(true);

    const getValue = (value: string) => {
        if(value == '\n'){
            setDisabled(true);
            setValueLenght(0)   
            return
        }
        setDisabled(false);
        setValueLenght(value.length )
        setTextValue(value)
    }

    const changeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setCurrentTitle(e.target.value);
    }

    const changeCheckedHandler = (id:string|number, checked: boolean) => {
        setTasksValue(
            tasksValue.map((task:ITask) => {
                if(task.id == id) {
                    task.checked = checked
                }
                return task
            })
        )
    }
    
    const getNoteObj = () => {
        return {
            id: id,
            title: currentTitle,
            time: time,
            color: currentColor,
            images: imagesValues,
            change: Date.now(),
            type: types.NOTE,
            text: textValue
        }
    }
    const getTasksObj = () => {
        return {
            id: id,
            type: types.TASK,
            title: currentTitle,
            tasks: tasksValue,
            time: time,
            color: currentColor,
            images: imagesValues,
            change: Date.now()
        }

    }
    
    const closeNote = () => {
        if(type == types.NOTE) {
            dispatch(PutNotes(id,getNoteObj()))
        }
        if(type == types.TASK) {
            dispatch(PutTasks(id, getTasksObj()))
        }
        setModalColorOpen(false);
        setwidth(305);
        setTimeout(() => {
            setOpen(false)

        }, 500)
    }

    const openNote = () => {
        setOpen(true)
        setwidth(WIDTH__NOTE_OPEN)
    }

    const dispatch = useDispatch<any>()

    const deleteNote = () => {
        if(type == types.NOTE) {

            dispatch(deleteNotes(id))
        }
        if(type == types.TASK) {

            dispatch(deleteTasks(id))
        }
    }

    const hadnletCheckedNote = () => {
        setChecked(!checked)
    }

    const currentId = (type === types.TASK) ? `tasks${id}` : id; 
    useEffect(() => {
        if(checked){
            setCheckedNotes(
                (checkedNotes.length > 0) ? [...checkedNotes, currentId] : [currentId]
            )
        }else{
            setCheckedNotes(
                checkedNotes.filter((noteId: string) => noteId !== currentId)
            )
        }     

    }, [checked])

    useEffect(() => {
        if(checkedNotes.length == 0) {
            setChecked(false)
        }
    }, [checkedNotes])

    useEffect(() => {
        setCurrentColor(color)
    }, [color])
    return (
        <div className={`note ${open ? 'active' : ''} ${checked ?  'checked' : ''}`} style={{width:`${WIDTH__NOTE}px`}}> 
            
            <button
                onClick={hadnletCheckedNote} 
                className={`note__btn-check ${open ? 'active' : ''}`}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path d="M438.6 105.4C451.1 117.9 451.1 138.1 438.6 150.6L182.6 406.6C170.1 419.1 149.9 419.1 137.4 406.6L9.372 278.6C-3.124 266.1-3.124 245.9 9.372 233.4C21.87 220.9 42.13 220.9 54.63 233.4L159.1 338.7L393.4 105.4C405.9 92.88 426.1 92.88 438.6 105.4H438.6z"/>
                </svg>
            </button>

            <button
                onClick={(checkedNotes.length > 0) ? hadnletCheckedNote : openNote}
                className="note__mask"
            >
            </button>
            {open ? 
                <button
                    onClick={closeNote} 
                    className='note__open-mask anim-opacity'
                ></button> : null}
            <div className="note__wrapper" style={{backgroundColor: currentColor, width:`${width}px`}}>
                
                
                <ImagesBlock setImages={setImagesValues} images={imagesValues} />
                
                <div className="note__header">
                    <input className='note__title' type="text" onChange={(e) => changeHandler(e)} defaultValue={currentTitle} name='title'/>
                </div>
                <div className="note__body">
                    {
                        
                        (type === types.NOTE) ? (
                            <Textarea
                                classes={["note__textarea"]}
                                placeholder={placeholder}
                                valueDef={text} 
                                setReset={setReset}
                                reset={reset}
                                getValue={getValue}
                            />
                        ) : (
                            tasksValue.map((task) => {
                                return <Task 
                                    id={task.id} 
                                    key={task.id} 
                                    value={task.value} 
                                    checked={task.checked} 
                                    handlerCheck={changeCheckedHandler}
                                />
                            })
                        )
                    }

                    {/* <textarea name="text" >
                        {text}
                    </textarea> */}
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
                        <button
                            onClick={closeNote}
                            className='note__close'

                        >Закрыть</button>
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