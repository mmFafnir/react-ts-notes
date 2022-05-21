import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import {ITask} from '../../types/task';

import './Task.scss'

interface IProps extends ITask {
    handlerCheck: (id: number|string, checked: boolean) => void,
    
}

const Task: FC<IProps> = ({
    value, id, checked, handlerCheck
}) => {

    const [valueTask, setValueTask] = useState<string>(value);
    const [checkedTask, setCheckedTask] = useState<boolean>(checked)
    
    useEffect(() => {
        handlerCheck(id, checkedTask)
    }, [checkedTask])
    
    const changeHandler = (e:ChangeEvent<HTMLInputElement>): void => {
        setValueTask(e.target.value)
    }
    return (
        <div className="task">
            <div className="task__checkbox">
                <label
                    className={checkedTask ? 'checked' : ''} 
                    htmlFor={id}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <path d="M438.6 105.4C451.1 117.9 451.1 138.1 438.6 150.6L182.6 406.6C170.1 419.1 149.9 419.1 137.4 406.6L9.372 278.6C-3.124 266.1-3.124 245.9 9.372 233.4C21.87 220.9 42.13 220.9 54.63 233.4L159.1 338.7L393.4 105.4C405.9 92.88 426.1 92.88 438.6 105.4H438.6z"/>
                    </svg>
                </label>
                <input 
                    onChange={() => setCheckedTask(!checkedTask)}
                    type="checkbox" 
                    id={id} defaultChecked={checked}/>
            </div>
            <div className="task__input">
                <input
                  onChange={(e) => changeHandler(e)}
                  type="text"
                  value={valueTask}/>
            </div>
        </div>
    );
};

export default Task;