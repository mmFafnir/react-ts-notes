
import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import { useDispatch } from 'react-redux';

import { deleteLabel, PutLabel } from '../../store/action-creators/label';

interface IProps {
    id: string;
    value: string;
    focusLabel: string;
    setFocusLabel: Dispatch<SetStateAction<string>>
}

const Label:FC<IProps> = ({
    id, value, focusLabel, setFocusLabel
}) => {

    const dispatch = useDispatch<any>()
    
    
    const [currentValue, setCurrentValue] = useState<string>(value);
    

    const hendlerPutLabel = () => {
        if(currentValue === '') return;
        dispatch(PutLabel({
            id: id,
            title: currentValue,
            notes: [],
        }))
        setFocusLabel('')
    }
    const hendlerDeleteLabel = () => {
        dispatch(deleteLabel(id));
    }

    return (
        <div key={value} id={id} className={`label  ${focusLabel === id ? 'active' : ''}`}>
            <label >
                <svg onClick={hendlerDeleteLabel} className='trash' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM394.8 466.1C393.2 492.3 372.3 512 346.9 512H101.1C75.75 512 54.77 492.3 53.19 466.1L31.1 128H416L394.8 466.1z"></path>
                </svg>
                <svg className='tag' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path d="M48 32H197.5C214.5 32 230.7 38.74 242.7 50.75L418.7 226.7C443.7 251.7 443.7 292.3 418.7 317.3L285.3 450.7C260.3 475.7 219.7 475.7 194.7 450.7L18.75 274.7C6.743 262.7 0 246.5 0 229.5V80C0 53.49 21.49 32 48 32L48 32zM112 176C129.7 176 144 161.7 144 144C144 126.3 129.7 112 112 112C94.33 112 80 126.3 80 144C80 161.7 94.33 176 112 176z"/>
                </svg>
            </label>
            <input 
                placeholder='Введите название ярлыка'
                onClick={() => setFocusLabel(id)} 
                onChange={(e) => setCurrentValue(e.target.value)}
                onKeyDown={(e) => {
                    if(e.key === 'Enter') {hendlerPutLabel()}
                }}
                value={currentValue}
                type="text"
            />
            <label>
                <svg onClick={() => {
                    const input = document.querySelector(`#${id} input`) as HTMLInputElement 
                    input.focus() 
                    setFocusLabel(id)
                }} className="pen" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M362.7 19.32C387.7-5.678 428.3-5.678 453.3 19.32L492.7 58.75C517.7 83.74 517.7 124.3 492.7 149.3L444.3 197.7L314.3 67.72L362.7 19.32zM421.7 220.3L188.5 453.4C178.1 463.8 165.2 471.5 151.1 475.6L30.77 511C22.35 513.5 13.24 511.2 7.03 504.1C.8198 498.8-1.502 489.7 .976 481.2L36.37 360.9C40.53 346.8 48.16 333.9 58.57 323.5L291.7 90.34L421.7 220.3z"/>
                </svg>  
                <svg onClick={hendlerPutLabel} className='check' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path d="M438.6 105.4C451.1 117.9 451.1 138.1 438.6 150.6L182.6 406.6C170.1 419.1 149.9 419.1 137.4 406.6L9.372 278.6C-3.124 266.1-3.124 245.9 9.372 233.4C21.87 220.9 42.13 220.9 54.63 233.4L159.1 338.7L393.4 105.4C405.9 92.88 426.1 92.88 438.6 105.4H438.6z"/>
                </svg>
            </label>
        </div>
    );
};

export default Label;