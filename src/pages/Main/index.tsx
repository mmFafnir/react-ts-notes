import React, { FC } from 'react';
import StackGrid from 'react-stack-grid';

import { useTypeSelector } from '../../hooks/useTypeSelector';

import INote from '../../types/note';
import ITaskNote from '../../types/task';

import CreateNote, { types } from '../../components/FormCreateNote';
import Note from '../../components/Note';

import './main.scss';
import TemplatePage from '../../components/TemplatePage';

enum actionsSort {
    FIXED = 'fixed',
    STATIC = 'static'
}

const Main:FC= () => { 


    const content = useTypeSelector(state => state.content);
    const listStyle = useTypeSelector(state => state.listStyle); 


    const sortContent = (action: actionsSort): (INote|ITaskNote)[] => {
        const notes = content.data ? content.data.filter((item) => !item.archive) : [];
        
        const arrFixed = notes.filter((item) => item.fixed);
        const noArrFixed = notes.filter((item) => !item.fixed);

        if(action === 'fixed') return arrFixed.sort((a, b) => Number(a.time) - Number(b.time)).reverse();
        if(action === 'static') return noArrFixed.sort((a, b) => Number(a.time) - Number(b.time)).reverse();
        return []
    }

    const getTemplateGrid = (action: actionsSort) => {
        const data = sortContent(action);
        let fixed = (action === actionsSort.STATIC) ? sortContent(actionsSort.FIXED).length : null;
        
        return (
            <>
            {!(data.length === 0) ? <h2>{(action === actionsSort.FIXED) ? 'Закрепленные' : `${fixed ?  "Другие заметки" : ''}`}</h2> : null}
            <StackGrid className={(data.length === 0) ? 'empty' : undefined}  gutterWidth={20} gutterHeight={20} columnWidth={listStyle.width}>   
                    {
                        sortContent(action).map((item) => {             
                            switch (item.type) {
                                case types.NOTE:
                                    return (
                                        <Note   
                                            key={item.id}
                                            note={item}
                                        />
                                    );
                                
                                case types.TASK:
                                    return (
                                        <Note 
                                            key={'tasks' + item.id}
                                            note={item}
                                        />
                                    )
                                default:
                                    break;
                            }
                        })
                    }
            </StackGrid>
            </>
        )
    } 

    return (
        <TemplatePage style={{margin: '20px auto', flex: "1 1 auto"}}>
            <CreateNote />  
            <div className="notes__body">
                {
                    getTemplateGrid(actionsSort.FIXED)
                }
                {   
                    getTemplateGrid(actionsSort.STATIC)
                }                
            </div>
        </TemplatePage>
    );
};

export default React.memo(Main);