import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import getDate from '../../script/getDate';
import { deleteNotes, PutNotes } from '../../store/action-creators/notes';
import { deleteTasks, PutTasks } from '../../store/action-creators/tasks';
import { ContentActionType } from '../../store/reducer/ContentReducer/contentInterface';
import { CurrentNoteActionTypes } from '../../store/reducer/CurrentNoteReducer/reducer';

import IImg from '../../types/img';
import INote from '../../types/note';
import ITaskNote, { ITask } from '../../types/task';

import ActionNote from '../ActionNote';
import { types } from '../FormCreateNote';
import FormCreateTasks from '../FormCreateTasks';
import FormEditingLabel from '../FormEditingLabel';
import ImagesBlock from '../ImagesBlock';
import LabelsBlock from '../LabelsBlock';
import ModalColor from '../ModalColor';
import FixedIcon from '../UI/FixedIcon';
import Scrollbar from '../UI/Scrollbar';
import Textarea from '../UI/Textarea';

import './formEditingNotes.scss'


interface IProps{
    note: INote|ITaskNote;
}
export const WIDTH__NOTE_OPEN = 700;

const FormEditingNotes:FC<IProps> = ({
    // id, text='', time, title, color='#fff', change, type, tasks = [], images = [], 
    note
}) => {
    
    const noteDOM = document.getElementById(note.id);
    const rect = noteDOM?.getBoundingClientRect();
    const animStart = {
        maxWidth: `${rect?.width}px`,
        left: `${rect?.left}px`,
        top: `${rect?.top}px`,
        // height: `${rect?.height}px`
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

    const dispatch = useDispatch<any>()

    const [modalColorOpen, setModalColorOpen] = useState<boolean>(false);
    const [modalLabelsOpen, setModalLabelsOpen] = useState<boolean>(false);
    
    const [archive, setArchive] = useState<boolean>(note.archive);
    
    const [currentTitle, setCurrentTitle] = useState<string>(note.title);
    const [currentText, setCurrentText] = useState<string>(note.text);
    const [currentTasks, setCurrentTasks] = useState<ITask[]>(note.tasks);
    const [currentColor, setCurrentColor] = useState<string>(note.color);
    const [currentImages, setCurrentImages] = useState<IImg[]>(note.images);
    const [currentFixed, setCurrentFixed] = useState<boolean>(note.fixed);
    
    const placeholder = 'Текст заметки';

    const [reset, setReset] = useState<boolean>(false);

    const [valueLenght, setValueLenght] = useState<number>(0);
    const [disabled, setDisabled] = useState<boolean>(true);


    const getValue = (value: string) => {
        if(value === '\n'){
            setDisabled(true);
            setValueLenght(0);
            setCurrentText('');
            return
        }
        setDisabled(false);
        setValueLenght(value.length);
        setCurrentText(value);
    }

    const changeHandlerTitle = (e:ChangeEvent<HTMLInputElement>) => {
        setCurrentTitle(e.target.value);
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
                noteDOM.style.opacity = '1'
            }
            dispatch({
                type: CurrentNoteActionTypes.SET_CURRENT_NOTE,
                payload: null
            })
            if(callback){
                callback()    
            }
        }, 500)
    }

    const closeNote = () => {
        setModalColorOpen(false)
        if(note.type === types.NOTE) {
            saveNoteText()
        }
        if(note.type === types.TASK) {
            saveNoteTasks()
        }
        animCloseNote()
        document.querySelector('body')?.classList.remove('lock');
        
    }

    const saveNoteText = () => {
        const changeTime = getDate();
        const noteNew = {
            title: currentTitle,
            text: currentText,
            time: note.time,
            color: currentColor,
            images: currentImages,
            id: note.id,
            change: `${changeTime.d}/${changeTime.m}/${changeTime.y}`,
            type: note.type,
            fixed: currentFixed,
            archive: archive,
        }
        dispatch({
            type: ContentActionType.CHANGE_CONTENT,
            payload: noteNew
        })
        dispatch(PutNotes(noteNew))
    }
    
    const saveNoteTasks = () => {
        const changeTime = getDate(); 
        const noteNew = {
            title: currentTitle,
            tasks: currentTasks,
            time: note.time,
            color: currentColor,
            images: currentImages,
            id: note.id,
            change: `${changeTime.d}/${changeTime.m}/${changeTime.y}`,
            type: note.type,
            fixed: currentFixed,
            archive: archive,
        }
        dispatch({
            type: ContentActionType.CHANGE_CONTENT,
            payload: noteNew
        })
        dispatch(PutTasks(noteNew))
    }

    const deleteNote = () => {
        setModalColorOpen(false);
        animCloseNote(() => {
            dispatch({
                type: ContentActionType.DELETE_CONTENT,
                payload: note.id
            })
            if(note.type === types.NOTE){
                dispatch(deleteNotes(note.id));
            }else if(note.type == types.TASK){
                dispatch(deleteTasks(note.id));
            } 
        });
    }
    
    
    
    
    useEffect(() => {
        setTimeout(animShow, 300)
    }, [])

    
    return (
        <div className='edit-note' onClick={(e) => {
            const target = e.target as HTMLElement; 
            if(target.classList.contains('edit-note')) {
                closeNote()
            }
        }}>
            <div className="edit-note__wrapper note__wrapper" style={{backgroundColor: currentColor, ...animState} }>
                <ImagesBlock setImages={setCurrentImages} images={currentImages} />
                <div className="edit-note__header notes__header note__header">
                    <FixedIcon defaultFixed={note.fixed} getValue={setCurrentFixed} classes={['']}/>
                    <div className="edit-note__title">
                        <input 
                            className='note__title ' 
                            placeholder='Заголовок'
                            type="text" 
                            onChange={(e) => changeHandlerTitle(e)} 
                            defaultValue={currentTitle} name='title'
                        />
                    </div>
                </div>
                <div className="edit-note__body note__body">
                    <Scrollbar>
                        { 
                            (note.type === types.NOTE) ? (
                                <Textarea
                                    classes={["note__textarea edit-note__textarea"]}
                                    placeholder={placeholder}
                                    valueDef={note.text} 
                                    setReset={setReset}
                                    reset={reset}
                                    getValue={getValue}
                                />
                            ) : (
                                <FormCreateTasks getTasks={setCurrentTasks} stateTask={currentTasks}/>
                            )
                        }
                    
                    </Scrollbar>
                        {<LabelsBlock noteId={note.id}/>}
                        
                    <time></time>
                </div>
                <div className="note__footer">
                    <div>
                        <ActionNote
                            setModalColorOpen={setModalColorOpen}
                            modalColorOpen={modalColorOpen}
                            setModalLabels={setModalLabelsOpen}
                            setImages={setCurrentImages}
                            setArchive={setArchive}
                            images={currentImages}
                            archive={note.archive}
                        />
                        <button
                            onClick={deleteNote}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                <path d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM394.8 466.1C393.2 492.3 372.3 512 346.9 512H101.1C75.75 512 54.77 492.3 53.19 466.1L31.1 128H416L394.8 466.1z"/>
                            </svg>
                        </button>
                    </div>
                        {
                            modalLabelsOpen ? (
                                <FormEditingLabel 
                                    noteId={note.id}
                                    closeModal={() => setModalLabelsOpen(false)}
                                
                                />
                            ) : ''
                        }
                    <div>
                        <button
                            onClick={closeNote}
                            className='edit-note__close note__close'

                        >Закрыть</button>
                    </div>
                </div>
                {modalColorOpen ? <ModalColor closeModal={setModalColorOpen} getColor={setCurrentColor} /> : null}
            </div>
        </div>
    );
};

export default FormEditingNotes;

