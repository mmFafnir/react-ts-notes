
import axios from 'axios'
import { AnyAction, Dispatch } from 'redux'
import { ThunkDispatch } from 'redux-thunk';
import { getStorage, setStorage } from '../../script/localStorage';
import ITaskNote from '../../types/task';
import { ContentActionType } from '../reducer/ContentReducer/contentInterface';
import { ILabel } from '../reducer/LabelReducer/type';
import { TasksDeleteActionType } from '../reducer/TaskReducer/deleteInteface';
import { TasksGetAction, TasksGetActionType } from '../reducer/TaskReducer/getInteface';
import { TasksPostActionType } from '../reducer/TaskReducer/postInterface';
import { TasksPutActionType } from '../reducer/TaskReducer/putInterface';
import { PostTrashNotes } from './trash';


const baseUrl = 'https://627eb84b271f386ceffc7720.mockapi.io'

export const fetchTasks = () => {
    return async (dispatch: any) => {
        try {
            dispatch({type: TasksGetActionType.FETCH__TASKS});
            // const response = await axios.get(`${baseUrl}/tasks`);
            const data = getStorage('tasks') ? getStorage('tasks') : [];
            console.log(data)
            dispatch({
                type: TasksGetActionType.FETCH__TASKS_SUCCESS,
                payload: data
            })
        } catch(e) {
            console.log(e)
            dispatch({
                type: TasksGetActionType.FETCH__TASKS_ERROR,
                payload: 'Произошла ошибка при загрузки заметок'
            })
        }
    }
}

export const postTasks = (task: ITaskNote) => {
    return async (dispatch: any) => {
        try {
            dispatch({type: TasksPostActionType.POST__TASKS});
            // const response = await axios.post(`${baseUrl}/tasks`, task);

            const data = getStorage('tasks') ? getStorage('tasks') : [];  
            setStorage('tasks', [task, ...data])
            
            dispatch({
                type: TasksPostActionType.POST__TASKS_SUCCESS,
                payload: task
            })
        } catch(e) {
            dispatch({
                type: TasksPostActionType.POST__TASKS_ERROR,
                payload: 'Произошла ошибка при сохраранении заметок'
            })
        }
    }
}

export const deleteTasks = (id:string|number) => {
    return async (dispatch: any) => {
        try {
            dispatch({type: TasksDeleteActionType.DELETE__TASKS});
            // const response = await axios.delete(`${baseUrl}/tasks/${id}`);
            const data = getStorage('tasks');

            setStorage('tasks', data.filter((item:ITaskNote) => item.id !== id));
            dispatch(PostTrashNotes(
                data.filter((item: ITaskNote) => item.id === id)[0]
            ))
            dispatch({
                type: TasksDeleteActionType.DELETE__TASKS_SUCCESS,
                payload: id
            })
        } catch(e) {
            console.log(e)
            dispatch({
                type: TasksDeleteActionType.DELETE__TASKS_ERROR,
                payload: 'Произошла ошибка при удалении заметок'
            })
        }
    }
}


export const PutTasks = (task:ITaskNote) => {
    return async (dispatch: any) => {
        try {
            dispatch({type: TasksPutActionType.PUT__TASKS});
            // const response = await axios.put(`${baseUrl}/tasks/${id}`, task);
            const data = getStorage('tasks');
            setStorage('tasks', data.map((item:ITaskNote) => {
                if(item.id == task.id) return task;
                return item
            }))         
            dispatch({
                type: ContentActionType.CHANGE_CONTENT,
                payload: task
            })
            // console.log(response)
            dispatch({
                type: TasksPutActionType.PUT__TASKS_SUCCESS,
                payload: task
            })
        } catch(e) {
            dispatch({
                type: TasksPutActionType.PUT__TASKS_ERROR,
                payload: 'Произошла ошибка при удалении заметок'
            })
        }
    }
}



