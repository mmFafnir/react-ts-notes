import ITaskNote from "../../../types/task";

export enum TasksPutActionType {
    PUT__TASKS = 'PUT__TASKS',
    PUT__TASKS_SUCCESS = 'PUT__TASKS_SUCCESS',
    PUT__TASKS_ERROR = 'PUT__TASKS_ERROR'
}


interface PutTasksActions {
    type: TasksPutActionType.PUT__TASKS;
}

interface PutTasksSuccessActions {
    type: TasksPutActionType.PUT__TASKS_SUCCESS;
    payload: ITaskNote

}

interface PutTasksErrorActions {
    type: TasksPutActionType.PUT__TASKS_ERROR;
    payload: null|string
}


export type TasksPutAction = PutTasksActions | PutTasksSuccessActions | PutTasksErrorActions;




