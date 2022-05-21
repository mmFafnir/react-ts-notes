
export enum TasksDeleteActionType {
    DELETE__TASKS = 'DELETE__TASKS',
    DELETE__TASKS_SUCCESS = 'DELETE__TASKS_SUCCESS',
    DELETE__TASKS_ERROR = 'DELETE__TASKS_ERROR'
}


interface DeleteTasksActions {
    type: TasksDeleteActionType.DELETE__TASKS;
}

interface DeleteTasksSuccessActions {
    type: TasksDeleteActionType.DELETE__TASKS_SUCCESS;
    payload: string|number

}

interface DeleteTasksErrorActions {
    type: TasksDeleteActionType.DELETE__TASKS_ERROR;
    payload: null|string
}


export type TasksDeleteAction = DeleteTasksActions | DeleteTasksSuccessActions | DeleteTasksErrorActions;




