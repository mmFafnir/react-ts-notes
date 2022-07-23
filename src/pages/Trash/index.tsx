

import React, { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import StackGrid from 'react-stack-grid';

import ImagesBlock from '../../components/ImagesBlock';
import EditForm from './EditForm';
import NoteTrash from './NoteTrash';

import { initialTrashNotes } from '../../store/action-creators/trash';
import INote from '../../types/note';
import ITaskNote from '../../types/task';
import { useTypeSelector } from '../../hooks/useTypeSelector';

import './trash.scss'
import TemplatePage from '../../components/TemplatePage';

interface IProps {
    checkedNotes: string[];
    setCheckedNotes: (item:string[]) => void;
}

const Trash:FC= () => {

    const dispatch = useDispatch<any>();
    //Удаленные заметки
    const {loading, data, error} = useTypeSelector(state => state.trash);

    const listStyle = useTypeSelector(state => state.listStyle);

    
    useEffect(() => {
        dispatch(initialTrashNotes())
    }, [])

    return (
        <TemplatePage classes={['trash-page']}>
            <div className="trash-page__wrapper">
                {data.length == 0 ? <p className='empty-notify'>Удаленных заметок нет в наличии</p> : null}
                <StackGrid gutterWidth={20} gutterHeight={20} columnWidth={listStyle.width}>
                    {
                        data.map(note => (
                        <NoteTrash 
                                key={note.id}
                                note={note} 
                            />
                        ))
                    }

                </StackGrid>
            </div>
        </TemplatePage>
    );
};

export default Trash;