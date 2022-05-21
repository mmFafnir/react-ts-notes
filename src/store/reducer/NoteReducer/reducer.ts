
import { useTypeSelector } from "../../../hooks/useTypeSelector";
import { NotesDeleteAction, NotesDeleteActionType } from "./deleteInteface";
import { NotesGetAction, NotesGetActionType } from "./getInteface";
import { NotesPostAction, NotesPostActionType } from "./postInterface";
import { NotesPutAction, NotesPutActionType } from "./putInterface";
import { NotesState } from "./type";

const initialState: NotesState = {
    data: [],
    loading: false,
    error: null
}

type ActionType = NotesGetAction | NotesPostAction | NotesDeleteAction | NotesPutAction;

export const noteReducer = (state = initialState, action:ActionType):NotesState => {

    switch(action.type) {
        //Загрузка всех заметок
        case NotesGetActionType.FETCH__NOTES:
            return {loading: true, error: null, data: []}
        
        case NotesGetActionType.FETCH__NOTES_SUCCESS:
            return {loading: false, error: null, data: action.payload}
            
        case NotesGetActionType.FETCH__NOTES_ERROR:
            return {loading: false, error: action.payload, data: []}
            

        //Добавить заметку
        case NotesPostActionType.POST__NOTES:
            return {loading: true, error: null, data: state.data}
        
        case NotesPostActionType.POST__NOTES_SUCCESS:
            return {loading: false, error: null, data: [ action.payload, ...state.data ]}
        
        case NotesPostActionType.POST__NOTES_ERROR:
            return {loading: false, error: action.payload, data: state.data}


        //Удаление заметки 
        case NotesDeleteActionType.DELETE__NOTES:
            return {loading: true, error: null, data: state.data}
        
        case NotesDeleteActionType.DELETE__NOTES_SUCCESS:
            return {loading: false, error: null, data: state.data.filter(note => note.id !== action.payload)}
        
        case NotesDeleteActionType.DELETE__NOTES_ERROR:
            return {loading: false, error: action.payload, data: state.data}
            

        //Редактирование заметк
        case NotesPutActionType.PUT__NOTES:
            return {loading: true, error: null, data: state.data}
        
        case NotesPutActionType.PUT__NOTES_SUCCESS:
            return {loading: false, error: null, data: state.data.map(item => item.id === action.payload.id ? action.payload : item)}
        
        case NotesPutActionType.PUT__NOTES_ERROR:
            return {loading: false, error: action.payload, data: state.data}
       
            
        default:
            return state
    }

}