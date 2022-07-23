

import React, { FC, useEffect, useState } from 'react';
import { useTypeSelector } from '../../hooks/useTypeSelector';
import { ILabel } from '../../store/reducer/LabelReducer/type';

import Label from './Label';

import { useDispatch } from 'react-redux';
import { postLabel, PutLabel } from '../../store/action-creators/label';
import Scrollbar from '../UI/Scrollbar';

import './formEditingLabel.scss';
interface IProps {
    noteId: string,
    closeModal: () => void;
}

const FormEditingLabel:FC<IProps> = ({
    noteId, closeModal
}) => {

    const dispatch = useDispatch<any>();

    const labels = useTypeSelector(state => state.label);

    const [searchValue, setSearchValue] = useState<string>('');
    const [createStatus, setCreateStatus] = useState<boolean>(false);

    const handlerSearchValue = (value: string) => {
        if(value.length > 30) return;
        setSearchValue(value)
    }

    const sortlabels = (): ILabel[] => {
        const res = labels.data.filter((label) => label.title.includes(searchValue));
        return res
    }

    const addLabel = (label:ILabel) => {
        dispatch(PutLabel(label))
    }

    const removeLabel = (label: ILabel, noteId:string) => {
        dispatch(PutLabel({
            id: label.id,
            title: label.title,
            notes: label.notes.filter(id => id !== noteId)
        }))
    }

    const createLabel = () => {
        if(searchValue.length === 0) return
        const label:ILabel = {
            id:  `label${Date.now()}`,
            title: searchValue,
            notes: [noteId]
        }
        dispatch(postLabel(label))

    }

    const clickOutside = (e:MouseEvent) => {
        const target = e.target as HTMLElement;
        if(!target.closest('.edit-label') && !target.closest('.label-btn')){
            closeModal()
        }
    }

    useEffect(() => {
       if(sortlabels().length === 0) {
        setCreateStatus(true);
       } else {
        setCreateStatus(false);
       }
    }, [searchValue]) 

    useEffect(() => {
        document.addEventListener('click', clickOutside);
        return () => {
            document.removeEventListener('click', clickOutside);
        }
    }, [])
    return (
        <div className="edit-label">
            <div className="edit-label__wrapper">
                <div className="edit-label__header">
                    <p>Добавить ярлык</p>
                    <div className="edit-label__search">
                        <input 
                            type="text" 
                            placeholder='Введите название ярлыка'
                            onKeyDown={(e) => {
                                if(!createStatus) return;
                                if(e.key === 'Enter') {
                                    createLabel()
                                    setSearchValue('')
                                }
                            }}
                            value={searchValue} 
                            onChange={(e) => handlerSearchValue(e.target.value)}
                        />
                        <svg focusable="false" viewBox="0 0 24 24" width="24px" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20.49,19l-5.73-5.73C15.53,12.2,16,10.91,16,9.5C16,5.91,13.09,3,9.5,3S3,5.91,3,9.5C3,13.09,5.91,16,9.5,16 c1.41,0,2.7-0.47,3.77-1.24L19,20.49L20.49,19z M5,9.5C5,7.01,7.01,5,9.5,5S14,7.01,14,9.5S11.99,14,9.5,14S5,11.99,5,9.5z"></path><path d="M0,0h24v24H0V0z" fill="none"></path>
                        </svg>
                    </div>
                </div>
                <Scrollbar >
                    <div className="edit-label__body">
                            {
                                sortlabels().map(label => (
                                    <Label 
                                        addLabel={addLabel} 
                                        removeLabel={removeLabel}
                                        label={label}
                                        noteId={noteId}
                                    />
                                ))    
                            }
                    </div>
                </Scrollbar>
                <div className="edit-label_footer">
                    {
                        createStatus ? (
                            <button 
                                onClick={createLabel} 
                                className='label-create'
                            >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                        <path d="M432 256c0 17.69-14.33 32.01-32 32.01H256v144c0 17.69-14.33 31.99-32 31.99s-32-14.3-32-31.99v-144H48c-17.67 0-32-14.32-32-32.01s14.33-31.99 32-31.99H192v-144c0-17.69 14.33-32.01 32-32.01s32 14.32 32 32.01v144h144C417.7 224 432 238.3 432 256z"></path>
                                    </svg>
                                    <p>Создать ярлык: "{searchValue}"</p>
                            </button>
                        ) : ''
                    }
                </div>
            </div>
            
        </div>
    );
};

export default FormEditingLabel;