import ITask from "../../../types/task";



export interface TasksState {
    data: ITask[];
    loading: boolean;
    error: null|string
}
 