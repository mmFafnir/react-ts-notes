import ITaskNote from "../../../types/task";

export enum TasksPostActionType {
    POST__TASKS = 'POST__TASKS',
    POST__TASKS_SUCCESS = 'POST__TASKS_SUCCESS',
    POST__TASKS_ERROR = 'POST__TASKS_ERROR'
}


interface PostTasksActions {
    type: TasksPostActionType.POST__TASKS;

}

interface PostTasksSuccessActions {
    type: TasksPostActionType.POST__TASKS_SUCCESS;
    payload: ITaskNote

}

interface PostTasksErrorActions {
    type: TasksPostActionType.POST__TASKS_ERROR;
    payload: null|string
}


export type TasksPostAction = PostTasksActions | PostTasksSuccessActions | PostTasksErrorActions;




