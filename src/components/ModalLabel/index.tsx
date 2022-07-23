import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';
import { useTypeSelector } from '../../hooks/useTypeSelector';
import { postLabel, PutLabel } from '../../store/action-creators/label';
import Scrollbar from '../UI/Scrollbar';

import Label from './Label';

import './modalLabel.scss'

interface IProps {
    setModalLabel: Dispatch<SetStateAction<boolean>>
}

const ModalLabel:FC<IProps> = ({
    setModalLabel
}) => {

    const dispatch = useDispatch<any>();

    const [focus, setFocus] = useState<boolean>(false);
    const [focusLabel, setFocusLabel] = useState<string>('');
    const [currentLabel, setCurrentLabel] = useState<string>('');

    const [errorNotify, setErrorNotify] = useState<boolean>(false)
    
    const [titleValue, setTitleValue] = useState<string>('');
    
    const {data} = useTypeSelector(state => state.label)
    
    const handlerFocusTitle = () => {
        setFocus(true)
        
    }

    const removeFocusTitle = () => {
        setFocus(false)
        setTitleValue('')
    }

    const handlerPostLabel = () => {
        if(titleValue.length === 0) return
        if(data.filter(item => item.title === titleValue).length > 0){
            setErrorNotify(true);
            return
        }
        
        dispatch(postLabel({
            id: `label${Date.now()}`,
            title: titleValue,
            notes: []
        }))
        setTitleValue('');
        setErrorNotify(false)
    }
    const outsideClick = (e:MouseEvent) => {
        const target = e.target as HTMLElement;
        if(!target) return;
        if(!target.closest('.modal-label__create')) {
            setFocus(false)
            setErrorNotify(false)
        }
        
        if(!target.closest(`[id='${focusLabel}']`)){
            if(target.closest(`.label`)) return;
            if(currentLabel !== '') {
                const labelInput = document.querySelector(`#${currentLabel} input`) as HTMLInputElement;
                const label = data.filter(item => item.id === currentLabel)[0];
                if(labelInput && labelInput.value !== label.title && labelInput.value !== '') {
                    dispatch(PutLabel({ 
                        id: currentLabel,
                        title: labelInput.value,
                        notes: []
                    }))
                }
            }
            
            setFocusLabel('')
        }
        if(target.classList.contains('modal-label')) {
            setModalLabel(false)
        }
    }

    useEffect(() => {
        if(focusLabel !== '') {
            setCurrentLabel(focusLabel)
        }
    }, [focusLabel])

    useEffect(() => {
        document.addEventListener('click', outsideClick);
        return () => {
            document.removeEventListener('click', outsideClick);
        }
    }, [])

    return (
        <div className="modal-label" >
            <div className="modal-label__wrapper">
                <div className="modal-label__header">
                    <h2>Изменение ярлыков</h2>
                    <div className={`modal-label__create ${focus ? 'active' : ''}`}>
                            <label  className={`plus`} onClick={focus ? removeFocusTitle : () => {
                                document.getElementById('createLabel')?.focus();
                                setFocus(true);            
                            }}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                    <path d="M432 256c0 17.69-14.33 32.01-32 32.01H256v144c0 17.69-14.33 31.99-32 31.99s-32-14.3-32-31.99v-144H48c-17.67 0-32-14.32-32-32.01s14.33-31.99 32-31.99H192v-144c0-17.69 14.33-32.01 32-32.01s32 14.32 32 32.01v144h144C417.7 224 432 238.3 432 256z"/>
                                </svg>
                            </label>
                            <input 
                                onClick={handlerFocusTitle} 
                                onChange={(e) => setTitleValue(e.target.value)}
                                onKeyDown={(e) => {
                                    if(e.key === 'Enter') {handlerPostLabel()}
                                }}
                                value={titleValue}
                                type="text" name="label" 
                                placeholder='Создать ярлык'  
                                id='createLabel'
                            />
                            <label 
                                onClick={handlerPostLabel} 
                                className={`check`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                    <path d="M438.6 105.4C451.1 117.9 451.1 138.1 438.6 150.6L182.6 406.6C170.1 419.1 149.9 419.1 137.4 406.6L9.372 278.6C-3.124 266.1-3.124 245.9 9.372 233.4C21.87 220.9 42.13 220.9 54.63 233.4L159.1 338.7L393.4 105.4C405.9 92.88 426.1 92.88 438.6 105.4H438.6z"/>
                                </svg>
                            </label>
                    </div>
                </div>
                <div className="modal-label__body">
                    <Scrollbar >
                        {
                            data.map(item => (
                                <Label key={item.id} id={item.id} value={item.title} focusLabel={focusLabel} setFocusLabel={setFocusLabel} />
                            ))
                        }

                    </Scrollbar>

                </div>
                <div className="modal-label__footer">
                    <button onClick={() => setModalLabel(false)}>Готово</button>
                </div>
            </div>
        </div>
    );
};

export default ModalLabel;