import React, { FC, useState } from 'react';
import StackGrid from 'react-stack-grid';

import { types } from '../../components/FormCreateNote';
import Note from '../../components/Note';
import TemplatePage from '../../components/TemplatePage';

import { useTypeSelector } from '../../hooks/useTypeSelector';

import './archive.scss';




const Archive:FC= () => {

    const content = useTypeSelector(state => state.content);
    const listStyle = useTypeSelector(state => state.listStyle);
    

    const sortArchiveNotes = () => {
        return content.data.filter(note => note.archive);
    }

    return (

        <TemplatePage classes={['archive-page']}>
            <div className="archive-page__wrapper">
                <StackGrid gutterWidth={20} gutterHeight={20} columnWidth={listStyle.width}>
                    {
                        sortArchiveNotes().map(item => {
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

export default Archive;