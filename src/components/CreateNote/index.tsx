
import React, { ChangeEvent, useState, useSyncExternalStore } from 'react';
import { useDispatch } from 'react-redux';
import getDate from '../../script/getDate';
import { postNotes } from '../../store/action-creators/notes';
import { postTasks } from '../../store/action-creators/tasks';
import IImg from '../../types/img';
import { ITask } from '../../types/task';
import ActionNote from '../ActionNote';
import ImagesBlock from '../ImagesBlock';
import ModalColor from '../ModalColor';
import TaskCreate from '../TaskCreate';
import { Textarea } from '../UI/Textarea';

import './CreateNote.scss'


export const types = {
    NOTE: 'note',
    TASK: 'task'
}

const STATE_COLOR = '#fff'

const CreateNote = () => {

    const dispatch = useDispatch()

    const [title, setTitle] = useState<string>('');
    
    const [value, setValue] = useState<string>('');
    const [valueLenght, setValueLenght] = useState<number>(0);
    const [disabled, setDisabled] = useState<boolean>(true);
    
    const [tasks, setTasks] = useState<ITask[]>([])    

    const [reset, setReset] = useState(false);

    const [open, setOpen] = useState<boolean>(false);
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    const [type, setType] = useState<string>(types.NOTE);

    const [color, setColor] = useState<string>(STATE_COLOR);

    const [images, setImages] = useState<IImg[]>([])

    const changeTitle = (e:ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    }

    const closeCreateNotes = () => {
        if(type == types.NOTE) {
            createNotes();
        } 
        
        if(type == types.TASK) {
            createTasks()  
        }
        setColor(STATE_COLOR);
        setType(types.NOTE);
        setModalOpen(false)
        setOpen(false);
        setImages([])
    }  

    const getValue = (value: string) => {
        if(value == '\n'){
            setDisabled(true);
            setValueLenght(0)   
            return
        }
        setDisabled(false);
        setValueLenght(value.length )
        setValue(value)
    }
    
    const createNotes = () => {
        if(title.length == 0 && value.length == 0) return

        dispatch<any>(postNotes({
            id: String(Date.now()),
            time: getDate(),
            title: title,
            text: value,
            color: color,
            images: images,
            type: types.NOTE,
            
        }))

        setTitle('');
        setValue('');
    }
    
    const createTasks = () => {
        if(title.length == 0 && tasks.length == 0) return
        dispatch<any>(postTasks({
            id: String(Date.now()),
            time: getDate(),
            title: title,
            tasks: tasks,
            color: color, 
            images: images,
            type: types.TASK,
        }))

    }
    
    
    return (
        <div className='create-note' style={{backgroundColor:color}}>
            <div className="create-note__wrapper">
                <ImagesBlock 
                    setImages={setImages} 
                    images={images}
                />
                <div className="create-note__header" 
                    onClick={() => setOpen(true)}>

                    <div className="create-note__title">
                        <input
                            value={title}
                            onChange={(e) => changeTitle(e)}
                            placeholder='Введите заголовок' 
                            type="text" 
                            name="title" />
                    </div>
                    {
                        !open ? (
                            <div className="create-note__types">
                                <button className='task-icon' onClick={() =>  setType(types.TASK)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                        <path d="M384 32C419.3 32 448 60.65 448 96V416C448 451.3 419.3 480 384 480H64C28.65 480 0 451.3 0 416V96C0 60.65 28.65 32 64 32H384zM339.8 211.8C350.7 200.9 350.7 183.1 339.8 172.2C328.9 161.3 311.1 161.3 300.2 172.2L192 280.4L147.8 236.2C136.9 225.3 119.1 225.3 108.2 236.2C97.27 247.1 97.27 264.9 108.2 275.8L172.2 339.8C183.1 350.7 200.9 350.7 211.8 339.8L339.8 211.8z"/>
                                    </svg>
                                </button>
                            </div>
                        ) : null
                    }
                </div>
                {
                    open ? (
                        <>
                        <div className="create-note__body">
                            {
                                type === types.NOTE ? (
                                    <Textarea 
                                        placeholder='Заметки'
                                        classes={['create-note__textarea']}
                                        setReset={setReset}
                                        reset={reset}
                                        getValue={getValue}
                                    />
                                ) : (
                                    <TaskCreate getTasks={setTasks} />
                                )
                            }
                            </div>
                        <div className="create-note__footer">
                            <ActionNote 
                                setModalColorOpen={setModalOpen}
                                modalColorOpen={modalOpen}
                                images={images}
                                setImages={setImages}
                            />
                            <button
                                onClick={() => closeCreateNotes()} 
                                className="create-note__close"
                            >Закрыть</button>
                        </div>
                        </>
                    ) : null
                }
            </div>
            {
                modalOpen ? <ModalColor  getColor={setColor}/> : null
            }
        </div>
    );
};

export default CreateNote;