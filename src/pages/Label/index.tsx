import React, { FC, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import StackGrid from 'react-stack-grid';

import Note from '../../components/Note';
import TemplatePage from '../../components/TemplatePage';

import { useTypeSelector } from '../../hooks/useTypeSelector';

import INote from '../../types/note';
import ITaskNote from '../../types/task';

import './label.scss'


const Label:FC = () => {
    
    
    const notes = useTypeSelector(state => state.content);
    const labels = useTypeSelector(state => state.label);
    const listStyle = useTypeSelector(state => state.listStyle);
    
    const navigate = useNavigate();
    const params = useParams();


    const sortNotesLanbel = (): (INote|ITaskNote)[]  => {
        const res:(INote|ITaskNote)[] = [];
        const label = labels.data.find(label => label.title === params.id);
        if(!label) {
            navigate('/');
            
        }
        label?.notes.forEach(id => {
            const note = notes.data.filter(note => note.id === id)[0];
            if(note) {
                res.push(note)
            }
            
        })

        return res;
    }

    return (
        <TemplatePage classes={['label-page']}>
            <div className="label-page__wrapper">
                {
                    sortNotesLanbel().length > 0 ? (
                        <StackGrid gutterWidth={20} gutterHeight={20} columnWidth={listStyle.width}>
                            {
                                sortNotesLanbel().map(note => (
                                    <Note key={note.id} note={note}/>
                                ))
                            }
                        </StackGrid>
                    ) : (
                        <h2>Заметок нет</h2>
                    ) 
                }
            </div>
        </TemplatePage>
    );
};

export default Label;