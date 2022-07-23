
import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import {ITask} from '../../types/task';





import Task from '../Task';

import './formCreateTasks.scss'

interface IProps {
    getTasks: (arr: ITask[]) => void,
    stateTask?: ITask[]
}

const FormCreateTasks: FC<IProps> = ({
    getTasks, stateTask=[]
}) => {

    const [value, setValue] = useState<string>('');
    const [tasks, setTasks] = useState<ITask[]>(stateTask);

    
    const changeHandler = (e:ChangeEvent<HTMLInputElement>) => {
       setValue(e.target.value);
     }

    const clearInput = ():void => {
        setValue('');
    }

    const addTask = () => {
        if(value.length === 0) return
        const obj = {
            id: `task${Date.now()}`,
            value: value,
            checked: false
        }        
        setTasks(tasks => [...tasks, obj]);
        clearInput();
    }

    const changeCheckedHandler = (id:string|number, checked: boolean) => {
        setTasks(
            state => state.map((task:ITask) => {
                if(task.id == id) {
                    task.checked = checked
                }
                return task
            })
        )
    }

    const changeValueHandler = (id:string|number, value:string) => {
        setTasks(
            state => state.map((task:ITask) => {
                if(task.id == id) {
                    task.value = value
                }
                return task
            })
        )
    }

    const handlerDelete = (id: string|number) => {
        setTasks(tasks.filter(task => task.id !== id))
    }
    
    useEffect(() => {
        getTasks(tasks)
    }, [tasks])

    return (
        <div className='create-task'>
            <div className="create-task__body">
                {
                    tasks.map(task => (
                        <Task 
                            key={stateTask ? 'edit-' + task.id : task.id} 
                            value={task.value} 
                            id={stateTask ? 'edit-' + task.id : task.id} 
                            checked={task.checked}
                            handlerCheck={(checked:boolean) =>  changeCheckedHandler(task.id, checked)} 
                            getValue={(value:string) =>  changeValueHandler(task.id, value)}
                            onDelete={(id: string|number) => handlerDelete(task.id)}
                        />
                    ))
                }           
            </div>
            <div className="create-task__form">
                <span onClick={() => addTask()}>+</span>
                <input  
                    value={value}
                    onChange={(e) => changeHandler(e)}
                    onKeyDown={(e) => e.key == 'Enter' ? addTask() : null}
                    // onKeyDown={() => setValue(value)}
                    type="text"/>
            </div>
        </div>
    );
};

export default FormCreateTasks;