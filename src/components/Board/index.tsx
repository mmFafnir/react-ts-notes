
import React, { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteNotes, PutNotes } from '../../store/action-creators/notes';
import { deleteTasks, PutTasks } from '../../store/action-creators/tasks';
import { types } from '../CreateNote';
import ModalColor from '../ModalColor';


import './board.scss';

interface IProps {
    checkedNodes: string[];
    setCheckedNotes: (item: string[]) => void 
    content: any[];
    setContent: (notes:any[]) => void
}

const Board:FC<IProps>= ({
    checkedNodes, content, setContent, setCheckedNotes
}) => {

    const dispatch = useDispatch<any>();

    const [active, setActive] = useState<boolean>(false);

    const [openModalColor, setOpenModalColor] = useState<boolean>(false);
    const [color, setColor] = useState<string>('');

    const getCurrentContent = () => {
        var clonedArr = JSON.parse(JSON.stringify(content));
        const currentContent = clonedArr.map((note:any) => {
            if(note.type == types.TASK){
                note.id = `tasks${note.id}`;
                return note
            }
            return note
        }) 
        console.log(currentContent)
        return currentContent
    }
    
    const changeColor = () => {
        checkedNodes.forEach(id => {
            const note = getCurrentContent().filter(item => id == item.id)[0];
            note.color = color;
            
            if(note.type === types.NOTE){
                dispatch(PutNotes(id, note))
                
            } else if(note.type === types.TASK){
                dispatch(PutTasks(id.replace("tasks", ''), note))
            }
        })
    }

    const deleteCards = () => {
        checkedNodes.forEach(id => {
            const note = getCurrentContent().filter(item => id == item.id)[0];
            console.log(getCurrentContent())            
            if(note.type === types.NOTE){
                dispatch(deleteNotes(id))
                
            } else if(note.type === types.TASK){
                dispatch(deleteTasks(id.replace("tasks", '')))
            }
        })
        closeBoard()
    }

    const closeBoard  = () => {
        setActive(false);
        setOpenModalColor(false);
        setCheckedNotes([])
    }

    console.log(color)
    useEffect(() => {
        if(color !== '' && openModalColor ) {
            changeColor()
        }
    }, [color])


    useEffect(() => {
        if(checkedNodes.length > 0) {
            setActive(true)
        } else if(active) {
            closeBoard()
        }
    }, [checkedNodes])

    return (
        <div className={`board ${active ? 'active' : null}`}>
            <div className="board__wrapper">
                <div className="board__left">
                    <button onClick={closeBoard} className="board__close">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                            <path d="M376.6 427.5c11.31 13.58 9.484 33.75-4.094 45.06c-5.984 4.984-13.25 7.422-20.47 7.422c-9.172 0-18.27-3.922-24.59-11.52L192 305.1l-135.4 162.5c-6.328 7.594-15.42 11.52-24.59 11.52c-7.219 0-14.48-2.438-20.47-7.422c-13.58-11.31-15.41-31.48-4.094-45.06l142.9-171.5L7.422 84.5C-3.891 70.92-2.063 50.75 11.52 39.44c13.56-11.34 33.73-9.516 45.06 4.094L192 206l135.4-162.5c11.3-13.58 31.48-15.42 45.06-4.094c13.58 11.31 15.41 31.48 4.094 45.06l-142.9 171.5L376.6 427.5z"/>
                        </svg>
                    </button>
                    <p className="board__title">
                        Выбран{checkedNodes.length > 1 ? 'о' : 'а'} {checkedNodes.length} заметк{checkedNodes.length > 1 ? 'и' : 'а'}
                    </p>
                </div>  
                <div className="board__right">
                    <div className="board__btns">
                        <button 
                            onClick={() => setOpenModalColor(!openModalColor)}
                            className='color'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <path d="M512 255.1C512 256.9 511.1 257.8 511.1 258.7C511.6 295.2 478.4 319.1 441.9 319.1H344C317.5 319.1 296 341.5 296 368C296 371.4 296.4 374.7 297 377.9C299.2 388.1 303.5 397.1 307.9 407.8C313.9 421.6 320 435.3 320 449.8C320 481.7 298.4 510.5 266.6 511.8C263.1 511.9 259.5 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256V255.1zM96 255.1C78.33 255.1 64 270.3 64 287.1C64 305.7 78.33 319.1 96 319.1C113.7 319.1 128 305.7 128 287.1C128 270.3 113.7 255.1 96 255.1zM128 191.1C145.7 191.1 160 177.7 160 159.1C160 142.3 145.7 127.1 128 127.1C110.3 127.1 96 142.3 96 159.1C96 177.7 110.3 191.1 128 191.1zM256 63.1C238.3 63.1 224 78.33 224 95.1C224 113.7 238.3 127.1 256 127.1C273.7 127.1 288 113.7 288 95.1C288 78.33 273.7 63.1 256 63.1zM384 191.1C401.7 191.1 416 177.7 416 159.1C416 142.3 401.7 127.1 384 127.1C366.3 127.1 352 142.3 352 159.1C352 177.7 366.3 191.1 384 191.1z"/>
                            </svg>
                        </button>
                        <button 
                            onClick={deleteCards}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                <path d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM394.8 466.1C393.2 492.3 372.3 512 346.9 512H101.1C75.75 512 54.77 492.3 53.19 466.1L31.1 128H416L394.8 466.1z"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            {openModalColor ? <ModalColor getColor={setColor}/> : null} 
        </div>
    );
};

export default Board;