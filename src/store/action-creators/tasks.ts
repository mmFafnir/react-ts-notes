
import axios from 'axios'
import { AnyAction, Dispatch } from 'redux'
import { ThunkDispatch } from 'redux-thunk';
import ITaskNote from '../../types/task';
import { TasksDeleteActionType } from '../reducer/TaskReducer/deleteInteface';
import { TasksGetAction, TasksGetActionType } from '../reducer/TaskReducer/getInteface';
import { TasksPostActionType } from '../reducer/TaskReducer/postInterface';
import { TasksPutActionType } from '../reducer/TaskReducer/putInterface';


const baseUrl = 'https://627eb84b271f386ceffc7720.mockapi.io/'

export const fetchTasks = () => {
    return async (dispatch: any) => {
        try {
            dispatch({type: TasksGetActionType.FETCH__TASKS});
            const response = await axios.get(`${baseUrl}/tasks`);

            dispatch({
                type: TasksGetActionType.FETCH__TASKS_SUCCESS,
                payload: response.data
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
            const response = await axios.post(`${baseUrl}/tasks`, task);
            
            dispatch({
                type: TasksPostActionType.POST__TASKS_SUCCESS,
                payload: response.data
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
            const response = await axios.delete(`${baseUrl}/tasks/${id}`);

            
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


export const PutTasks = (id:string|number, task:ITaskNote) => {
    return async (dispatch: any) => {
        try {
            dispatch({type: TasksPutActionType.PUT__TASKS});
            const response = await axios.put(`${baseUrl}/tasks/${id}`, task);
            
            
            dispatch({
                type: TasksPutActionType.PUT__TASKS_SUCCESS,
                payload: response
            })
        } catch(e) {
            dispatch({
                type: TasksPutActionType.PUT__TASKS_ERROR,
                payload: 'Произошла ошибка при удалении заметок'
            })
        }
    }
}