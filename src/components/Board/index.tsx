
import React, { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { RoutePaths } from '../../App';
import { useTypeSelector } from '../../hooks/useTypeSelector';

import { deleteNotes, PutNotes } from '../../store/action-creators/notes';
import { deleteTasks, PutTasks } from '../../store/action-creators/tasks';
import { DeleteTrashNotes, RestoreTrashNotes } from '../../store/action-creators/trash';
import { CheckedNotesActionTypes } from '../../store/reducer/CheckedNotesReducer/CheckedNotesInterface';

import INote from '../../types/note';
import ITaskNote from '../../types/task';
import { types } from '../FormCreateNote';

import ModalColor from '../ModalColor';

import './board.scss';



const Board:FC = () => {

    const location = useLocation();


    const dispatch = useDispatch<any>();

    const content = useTypeSelector(state => state.content);

    const checkedNotes = useTypeSelector(state => state.checkedNotes); 

    const [active, setActive] = useState<boolean>(false);

    const [openModalColor, setOpenModalColor] = useState<boolean>(false);
    const [color, setColor] = useState<string>('');

    const trash = useTypeSelector(state => state.trash);

    const getCurrentContent = () => {
        var clonedArr = JSON.parse(JSON.stringify(content.data));

        return clonedArr
    }
    
    const changeColor = () => {
        checkedNotes.forEach(id => {
            const note = getCurrentContent().filter((item:any) => {
                if(item.id === id) return item
            })[0];
            note.color = color;  
            if(note.type === types.NOTE){
                dispatch(PutNotes(note))
                
            } else if(note.type === types.TASK){
                dispatch(PutTasks(note))
            }
        })
    }

    const changeArchive = () => {
        checkedNotes.forEach(id => {
            const note: INote|ITaskNote = getCurrentContent().filter((item:INote|ITaskNote) => {
                if(item.id === id) return item
            })[0];
            
            note.archive = !note.archive; 
            if(note.type === types.NOTE){
                dispatch(PutNotes(note as INote))
                
            } else if(note.type === types.TASK){
                dispatch(PutTasks(note as ITaskNote))
            }
        })
        closeBoard()
    }

    const fixedNotes = () => {
        let newNotes:any[] = [];
        checkedNotes.forEach(id => {
            const note = getCurrentContent().filter((item:any) => id == item.id)[0];
            newNotes.push(note)
        })
        
        const fixedNotes = newNotes.filter(note => note.fixed === true);  
        const allFixed = fixedNotes.length === newNotes.length; 
        
        newNotes.forEach((note) => {
            if(allFixed){
                note.fixed = false;
            } else {
                note.fixed = !fixedNotes ? false : true;
            }
            if(note.type === types.NOTE){
                dispatch(PutNotes(note))
                
            } else if(note.type === types.TASK){
                dispatch(PutTasks(note))
            }
        })
        closeBoard()
    }

    const deleteAllNotes = () => { 
        checkedNotes.forEach(id => {
            const note = getCurrentContent().filter((item:any) => id == item.id)[0];
            console.log(id)            
            if(note.type === types.NOTE){
                dispatch(deleteNotes(id))
                
            } else if(note.type === types.TASK){
                dispatch(deleteTasks(id))
            }
        })
        closeBoard()
        removeAllNotes()
    }

    const deleteTrashNotes = () => {
        checkedNotes.forEach(id => {            
            dispatch(DeleteTrashNotes(id))
        })
        closeBoard()
        removeAllNotes()
    }
    
    const restoreTrashNotes = () => {        
        checkedNotes.forEach(id => {
            const note = trash.data.filter((item:any) => id == item.id)[0];
            dispatch(RestoreTrashNotes(note));
        })
        closeBoard()
        removeAllNotes()
    }

    const removeAllNotes = () => {
        dispatch({
            type: CheckedNotesActionTypes.REMOVE_ALL_NOTES
        })
    }

    const closeBoard = () => {
        setActive(false);
        setOpenModalColor(false);
        
    }

    

    useEffect(() => {
        if(color !== '' && openModalColor ) {
            changeColor()
        }
    }, [color])


    useEffect(() => {
        if(checkedNotes.length > 0) {
            setActive(true)
        } else if(active) {
            closeBoard()
        }
    }, [checkedNotes])

    useEffect(() => {
        closeBoard()
    }, [location])

    return (
        <div className={`board ${active ? 'active' : null}`}>
            <div className="board__wrapper">
                <div className="board__left">
                    <button onClick={removeAllNotes} className="board__close">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                            <path d="M376.6 427.5c11.31 13.58 9.484 33.75-4.094 45.06c-5.984 4.984-13.25 7.422-20.47 7.422c-9.172 0-18.27-3.922-24.59-11.52L192 305.1l-135.4 162.5c-6.328 7.594-15.42 11.52-24.59 11.52c-7.219 0-14.48-2.438-20.47-7.422c-13.58-11.31-15.41-31.48-4.094-45.06l142.9-171.5L7.422 84.5C-3.891 70.92-2.063 50.75 11.52 39.44c13.56-11.34 33.73-9.516 45.06 4.094L192 206l135.4-162.5c11.3-13.58 31.48-15.42 45.06-4.094c13.58 11.31 15.41 31.48 4.094 45.06l-142.9 171.5L376.6 427.5z"/>
                        </svg>
                    </button>
                    <p className="board__title">
                        Выбран{checkedNotes.length > 1 ? 'о' : 'а'} {checkedNotes.length} заметк{checkedNotes.length > 1 ? 'и' : 'а'}
                    </p>
                </div>  
                <div className="board__right">
                    <div className="board__btns">
                        {
                            window.location.pathname == '/' + RoutePaths.TRASH ? (
                                
                                <div className='trash-actions'>
                                    <button onClick={restoreTrashNotes} className='remove-trash'>
                                        <svg className='arrow' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                                            <path d="M310.6 182.6c-12.51 12.51-32.76 12.49-45.25 0L192 109.3V480c0 17.69-14.31 32-32 32s-32-14.31-32-32V109.3L54.63 182.6c-12.5 12.5-32.75 12.5-45.25 0s-12.5-32.75 0-45.25l128-128c12.5-12.5 32.75-12.5 45.25 0l128 128C323.1 149.9 323.1 170.1 310.6 182.6z"/>
                                        </svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                            <path d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM394.8 466.1C393.2 492.3 372.3 512 346.9 512H101.1C75.75 512 54.77 492.3 53.19 466.1L31.1 128H416L394.8 466.1z"></path>
                                        </svg>
                                    </button>
        
                                    <button onClick={deleteTrashNotes} className='delete-trash'>
                                        <svg className='x' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                                            <path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"/>
                                        </svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                            <path d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM394.8 466.1C393.2 492.3 372.3 512 346.9 512H101.1C75.75 512 54.77 492.3 53.19 466.1L31.1 128H416L394.8 466.1z"></path>
                                        </svg>    
                                    </button>              
                                </div>
                                

                            ) : (
                                <>
                                    <button
                                        onClick={fixedNotes}
                                    >   
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M32 32C32 14.33 46.33 0 64 0H320C337.7 0 352 14.33 352 32C352 49.67 337.7 64 320 64H290.5L301.9 212.2C338.6 232.1 367.5 265.4 381.4 306.9L382.4 309.9C385.6 319.6 383.1 330.4 377.1 338.7C371.9 347.1 362.3 352 352 352H32C21.71 352 12.05 347.1 6.04 338.7C.0259 330.4-1.611 319.6 1.642 309.9L2.644 306.9C16.47 265.4 45.42 232.1 82.14 212.2L93.54 64H64C46.33 64 32 49.67 32 32zM224 384V480C224 497.7 209.7 512 192 512C174.3 512 160 497.7 160 480V384H224z"></path></svg>
                                    </button>
                                    <button 
                                        onClick={() => setOpenModalColor(!openModalColor)}
                                        className='color'>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                            <path d="M512 255.1C512 256.9 511.1 257.8 511.1 258.7C511.6 295.2 478.4 319.1 441.9 319.1H344C317.5 319.1 296 341.5 296 368C296 371.4 296.4 374.7 297 377.9C299.2 388.1 303.5 397.1 307.9 407.8C313.9 421.6 320 435.3 320 449.8C320 481.7 298.4 510.5 266.6 511.8C263.1 511.9 259.5 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256V255.1zM96 255.1C78.33 255.1 64 270.3 64 287.1C64 305.7 78.33 319.1 96 319.1C113.7 319.1 128 305.7 128 287.1C128 270.3 113.7 255.1 96 255.1zM128 191.1C145.7 191.1 160 177.7 160 159.1C160 142.3 145.7 127.1 128 127.1C110.3 127.1 96 142.3 96 159.1C96 177.7 110.3 191.1 128 191.1zM256 63.1C238.3 63.1 224 78.33 224 95.1C224 113.7 238.3 127.1 256 127.1C273.7 127.1 288 113.7 288 95.1C288 78.33 273.7 63.1 256 63.1zM384 191.1C401.7 191.1 416 177.7 416 159.1C416 142.3 401.7 127.1 384 127.1C366.3 127.1 352 142.3 352 159.1C352 177.7 366.3 191.1 384 191.1z"/>
                                        </svg>
                                    </button>
                                    <button 
                                        onClick={deleteAllNotes}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                            <path d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM394.8 466.1C393.2 492.3 372.3 512 346.9 512H101.1C75.75 512 54.77 492.3 53.19 466.1L31.1 128H416L394.8 466.1z"/>
                                        </svg>
                                    </button>
                                    
                                    <button
                                        style={{padding: '5px'}}
                                        onClick={changeArchive}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                            <path d="M20.54 5.23l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.16.55L3.46 5.23C3.17 5.57 3 6.02 3 6.5V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.48-.17-.93-.46-1.27zM6.24 5h11.52l.83 1H5.42l.82-1zM5 19V8h14v11H5zm11-5.5l-4 4-4-4 1.41-1.41L11 13.67V10h2v3.67l1.59-1.59L16 13.5z"></path>
                                        </svg>
                                    </button>
                                
                                </>

                            )
                        }
                    </div>
                </div>
            </div>
            {openModalColor ? <ModalColor closeModal={setOpenModalColor} getColor={setColor}/> : null} 
        </div>
    );
};

export default Board;