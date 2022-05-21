
import ITaskNote from "../../../types/task";
import { TasksState } from "./type";

export enum TasksGetActionType {
    FETCH__TASKS = 'FETCH__TASKS',
    FETCH__TASKS_SUCCESS = 'FETCH__TASKS_SUCCESS',
    FETCH__TASKS_ERROR = 'FETCH__TASKS_ERROR'
}
 


interface FetchTasksActions {
    type: TasksGetActionType.FETCH__TASKS;

}

interface FetchTasksSuccessActions {
    type: TasksGetActionType.FETCH__TASKS_SUCCESS;
    payload: ITaskNote[]

}

interface FetchTasksErrorActions {
    type: TasksGetActionType.FETCH__TASKS_ERROR;
    payload: null|string
}


export type TasksGetAction = FetchTasksActions | FetchTasksSuccessActions | FetchTasksErrorActions;

