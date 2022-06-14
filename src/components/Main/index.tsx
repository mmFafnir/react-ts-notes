import React, { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import StackGrid from 'react-stack-grid';
import { useTypeSelector } from '../../hooks/useTypeSelector';
import { deleteNotes } from '../../store/action-creators/notes';
import { deleteTasks } from '../../store/action-creators/tasks';
import { ContentActionType } from '../../store/reducer/ContentReducer/contentInterface';
import INote from '../../types/note';
import ITaskNote from '../../types/task';
import CreateNote, { types } from '../FormCreateNote';
import FormEditingNotes from '../FormEditingNotes';
import Note, { WIDTH__NOTE } from '../Note';

import './main.scss';

interface IProps {
    // content: any[];
    // setContent: (state:any[]) => void;
    checkedNotes: string[];
    setCheckedNotes: (item:string[]) => void;
}

const Main:FC<IProps> = ({
    // content,
    // setContent,
    checkedNotes,
    setCheckedNotes
}) => { 

    const dispatch = useDispatch<any>();

    const content = useTypeSelector(state => state.content);

    const [currentNote, setCurrentNote] = useState<(ITaskNote|INote)|null>(null);
    const [grid, setGrid] = useState<any>(null);
    const [fixed, setFixed] = useState<number>(0)

    const contentChange = (note: INote|ITaskNote) => {
        dispatch({
            type: ContentActionType.CHANGE_CONTENT,
            payload: note
        })
    }
    const contentDelete = (id: string, type:string) => {
        dispatch({
            type: ContentActionType.DELETE_CONTENT,
            payload: id
        })
        if(type === types.NOTE){
            dispatch(deleteNotes(id));
        }else if(type == types.TASK){
            dispatch(deleteTasks(id));
        } 
    }



    const sortContent = () => {
        
        const arrFixed = content ? content.data.filter((item) => item.fixed): [];
        const noArrFixed = content ? content.data.filter((item) => !item.fixed) : [];
        // setFixed(arrFixed.length)
        return [ ...arrFixed, ...noArrFixed.sort((a, b) => Number(a.time) - Number(b.time)).reverse()]
    
    }

    return (
        <main style={{margin: '20px auto', flex: "1 1 auto"}}>
            <CreateNote />  
            <div className="notes__body">
                <StackGrid gridRef={(grid) => setGrid(grid)} gutterWidth={20} gutterHeight={20} columnWidth={WIDTH__NOTE}>
                    {
                        sortContent().map((item, index) => {
                            
                            switch (item.type) {
                                case types.NOTE:
                                    return (
                                        <>
                                            {/* {index === 1 && fixed > 0? <h2>Закрепленные</h2> : null}  */}
                                            <Note   
                                            key={item.id}
                                            note={item}
                                            setCheckedNotes={(note) => setCheckedNotes(note)}
                                            checkedNotes={checkedNotes}
                                            setCurrentNote={setCurrentNote}
                                            changeContent={contentChange}
                                            />
                                        </>
                                    );
                                
                                case types.TASK:
                                    return (
                                        <>                                        
                                            {/* {index === 1 && fixed > 0? <h2>Закрепленные</h2> : null} */}
                                            <Note 
                                            key={'tasks' + item.id}
                                            note={item}
                                            setCheckedNotes={(note) => setCheckedNotes(note)}
                                            checkedNotes={checkedNotes}
                                            setCurrentNote={setCurrentNote}
                                            changeContent={contentChange}
                                            />
                                        </>

                                    )
                                default:
                                    break;
                            }
                        })

                    }
                </StackGrid>
            </div>
            {
                currentNote ? ( 
                    <FormEditingNotes 
                        note={currentNote}
                        // {...currentNote} 
                        setCurrentNote={() => setCurrentNote(null)}
                        contentChange={contentChange}
                        contentDelete={contentDelete}
                    />) : null 
            }
            
        </main>
    );
};

export default Main;