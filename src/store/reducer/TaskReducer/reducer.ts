
import { useTypeSelector } from "../../../hooks/useTypeSelector";
import { TasksDeleteAction, TasksDeleteActionType } from "./deleteInteface";
import { TasksGetAction, TasksGetActionType } from "./getInteface";
import { TasksPostAction, TasksPostActionType } from "./postInterface";
import { TasksPutAction, TasksPutActionType } from "./putInterface";
import { TasksState } from "./type";

const initialState: TasksState = {
    data: [],
    loading: false,
    error: null
}

type ActionType = TasksGetAction | TasksPostAction | TasksDeleteAction | TasksPutAction;

export const tasksReducer = (state = initialState, action:ActionType):TasksState => {

    switch(action.type) {
        //Загрузка всех заметок
        case TasksGetActionType.FETCH__TASKS:
            return {loading: true, error: null, data: []}
        
        case TasksGetActionType.FETCH__TASKS_SUCCESS:
            return {loading: false, error: null, data: action.payload}
            
        case TasksGetActionType.FETCH__TASKS_ERROR:
            return {loading: false, error: action.payload, data: []}
            

        //Добавить заметку
        case TasksPostActionType.POST__TASKS:
            return {loading: true, error: null, data: state.data}
        
        case TasksPostActionType.POST__TASKS_SUCCESS:
            return {loading: false, error: null, data: [ action.payload, ...state.data ]}
        
        case TasksPostActionType.POST__TASKS_ERROR:
            return {loading: false, error: action.payload, data: state.data}


        //Удаление заметки 
        case TasksDeleteActionType.DELETE__TASKS:
            return {loading: true, error: null, data: state.data}
        
        case TasksDeleteActionType.DELETE__TASKS_SUCCESS:
            return {loading: false, error: null, data: state.data.filter(task => task.id !== action.payload)}
        
        case TasksDeleteActionType.DELETE__TASKS_ERROR:
            return {loading: false, error: action.payload, data: state.data}
            

        //Редактирование заметк
        case TasksPutActionType.PUT__TASKS:
            return {loading: true, error: null, data: state.data}
        
        case TasksPutActionType.PUT__TASKS_SUCCESS:
            return {loading: false, error: null, data: state.data.map(item => item.id === action.payload.id ? action.payload : item)}
        
        case TasksPutActionType.PUT__TASKS_ERROR:
            return {loading: false, error: action.payload, data: state.data}
       
            
        default:
            return state
    }

}