import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import {ITask} from '../../types/task';

import './Task.scss'

interface IProps extends ITask {
    handlerCheck: (checked: boolean) => void;
    onDelete?: (id:number|string) => void;
    getValue?: (value: string) => void; 
    
}

const Task: FC<IProps> = ({
    value, id, checked, 
    handlerCheck, onDelete, getValue = (value) => {}  
}) => {

    const [valueTask, setValueTask] = useState<string>(value);
    const [checkedTask, setCheckedTask] = useState<boolean>(checked);
    
    const clickChecked = () => {
        setCheckedTask(!checkedTask)
        handlerCheck(!checkedTask)
        
    }
    const changeHandler = (e:ChangeEvent<HTMLInputElement>): void => {
            setValueTask(e.target.value)
            getValue(e.target.value)
    }

    useEffect(() => {
        setValueTask(value)
    }, [value])    
    return (
        <div className="task">
            <div className="task__checkbox">
                <label
                    className={checked ? 'checked' : ''} 
                    htmlFor={id}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <path d="M438.6 105.4C451.1 117.9 451.1 138.1 438.6 150.6L182.6 406.6C170.1 419.1 149.9 419.1 137.4 406.6L9.372 278.6C-3.124 266.1-3.124 245.9 9.372 233.4C21.87 220.9 42.13 220.9 54.63 233.4L159.1 338.7L393.4 105.4C405.9 92.88 426.1 92.88 438.6 105.4H438.6z"/>
                    </svg>
                </label>
                <input 
                    onChange={clickChecked}
                    type="checkbox" 
                    id={id} 
                    defaultChecked={checked}/>
            </div>
            <div className="task__input">
                <input
                  onChange={(e) => changeHandler(e)}
                  type="text"
                  value={valueTask}/>
            </div>
            {
                onDelete ? (
                    <button
                        onClick={() => onDelete(id)} 
                        className="task__close"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M376.6 427.5c11.31 13.58 9.484 33.75-4.094 45.06c-5.984 4.984-13.25 7.422-20.47 7.422c-9.172 0-18.27-3.922-24.59-11.52L192 305.1l-135.4 162.5c-6.328 7.594-15.42 11.52-24.59 11.52c-7.219 0-14.48-2.438-20.47-7.422c-13.58-11.31-15.41-31.48-4.094-45.06l142.9-171.5L7.422 84.5C-3.891 70.92-2.063 50.75 11.52 39.44c13.56-11.34 33.73-9.516 45.06 4.094L192 206l135.4-162.5c11.3-13.58 31.48-15.42 45.06-4.094c13.58 11.31 15.41 31.48 4.094 45.06l-142.9 171.5L376.6 427.5z"></path></svg>
                    </button>
                ) : null

            }
        </div>
    );
};

export default Task;