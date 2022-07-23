
import React, { FC, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import StackGrid from 'react-stack-grid';

import { useTypeSelector } from '../../hooks/useTypeSelector';
import INote from '../../types/note';
import ITaskNote, { ITask } from '../../types/task';
import { types } from '../../components/FormCreateNote';
import Note from '../../components/Note';

import './searchBlock.scss';
import TemplatePage from '../../components/TemplatePage';


const SearchBlock:FC= () => {

    
    const location = useLocation();
    
    const content = useTypeSelector(state => state.content);
    const listStyle  = useTypeSelector(state => state.listStyle);

    

    const [sortData, setSortData] = useState<(ITaskNote|INote)[]>([]);


    const searchSort = () => {

        const searchValue = decodeURI(location.search.replace('?=', '').toLocaleLowerCase());

        const res:(ITaskNote|INote)[] = [];
        content.data.forEach(note => {
            if(note.title.toLocaleLowerCase().includes(searchValue)) {
                console.log(note.title.toLocaleLowerCase())
                res.push(note)
                
            }
            if(note.text?.toLocaleLowerCase().includes(searchValue)){
                if(!res.find(item => item.id === note.id)){
                    res.push(note)
                }
            }
            if(note.tasks) {
                const currentTasks = note.tasks.filter((task: ITask) => task.value.includes(searchValue));
                if(currentTasks.length > 0 && !res.find(item => item.id === note.id)){
                    res.push(note)
                }
            }
        })
        setSortData(res);
        setTimeout(() => {
            paintSearch(res, searchValue);
        }, 100);
        
    }
    const paintSearch = (notes: (ITaskNote|INote)[], searchValue: string) => {
        const regex = 'gi'
        notes.forEach(note => {
            const noteDom = document.getElementById(note.id) ; 
            if(!noteDom) return;
            
            const titleDom = noteDom?.querySelector('.note__header');
            if(titleDom) {
                titleDom.innerHTML = `<p className='note__title'>${
                    note.title.replace(new RegExp(searchValue, regex), "<span style='color:Red; display:inline;'>" + searchValue + "</span>")
                }</p>`
                console.log(titleDom)
            }

            const textDom = noteDom?.querySelector('.note__textarea');
            if(textDom) {
                textDom.innerHTML = `<p className='note__title'>${
                    note.text.replace(new RegExp(searchValue, regex), "<span style='color:Red; display:inline;'>" + searchValue + "</span>")
                }</p>`
            }
            
            if(note.tasks) {
                for (let i = 0; i < note.tasks.length; i++) {
                    const task = note.tasks[i];
                    const taskValueDom = noteDom.querySelector(`#${task.id} .task__input`);
                    if(taskValueDom) {
                        taskValueDom.innerHTML = `<p className='task__input_text'>${
                            task.value.replace(new RegExp(searchValue, regex), "<span style='color:Red; display:inline;'>" + searchValue + "</span>")
                        }</p>`
                    }
                }
            }
        })
    }  
    useEffect(() => {
        searchSort()
    }, [location])

    return (
        <TemplatePage classes={['search-block']}>
            {
                sortData.length === 0 ? <h2>Ничего не найдено</h2> : ''
            }
            <div className='search-block__main'>
                <StackGrid columnWidth={listStyle.width}>
                    {
                        sortData.map((item: (INote|ITaskNote), index) => {             
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
            </div>
            
        </TemplatePage>
    );
};

export default SearchBlock;