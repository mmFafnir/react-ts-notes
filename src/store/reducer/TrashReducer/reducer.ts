
import INote from "../../../types/note";
import ITaskNote from "../../../types/task";
import { DeleteTrashActionType, TrashDeleteActions } from "./deleteInterface";
import { InitialTrashActionType, TrashInitialActions } from "./initialInterface";
import { postTrashActionType, TrashPostActions } from "./postInterface";
import { IState } from "./types";


const initialState:IState = {
    data: [],
    loading: false,
    error: null
};

type ActionType = TrashInitialActions | TrashPostActions | TrashDeleteActions;

export const trashReducer = (state = initialState, action: ActionType) => {
    switch (action.type) {

        //Загрузка удаленных заметок
        case InitialTrashActionType.INITIAL_TRASH_NOTES:
            return {loading: true, error: null, data: []};
        
        case InitialTrashActionType.INITIAL_TRASH_NOTES__SUCCESS:
            return {loading: false, error: null, data: action.payload};

        case InitialTrashActionType.INITIAL_TRASH_NOTES__ERROR:
            return {loading: false, error: action.payload, data: state.data};



        //Добавление заметки в корзину
        case postTrashActionType.POST_TRASH_NOTES:
            return {loading: true, error: null, data: state.data};
        
        case postTrashActionType.POST_TRASH_NOTES__SUCCESS:
            return {loading: false, error: null, data: [action.payload, ...state.data]};

        case postTrashActionType.POST_TRASH_NOTES__ERROR:
            return {loading: false, error: action.payload, data: state.data};



        //Окончательное удаление заметки
        case DeleteTrashActionType.DELETE_TRASH_NOTES:
            return {loading: true, error: null, data: state.data};
        
        case DeleteTrashActionType.DELETE_TRASH_NOTES__SUCCESS: {
            return {loading: false, error: null, data: state.data.filter(note => note.id !== action.payload)};
        }

        case DeleteTrashActionType.DELETE_TRASH_NOTES__ERROR:
            return {loading: false, error: action.payload, data: state.data};


            
        default:
            return state;
    }
}   