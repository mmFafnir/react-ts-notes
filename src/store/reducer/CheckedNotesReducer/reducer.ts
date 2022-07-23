
import { CheckedNotesActions, CheckedNotesActionTypes } from "./CheckedNotesInterface";

const initialState:string[] = [];

export const checkedNotesReducer = (state = initialState, action: CheckedNotesActions) => {
    switch (action.type) {
        case CheckedNotesActionTypes.ADD_NOTE:
            return [action.payload, ...state];
    
        case CheckedNotesActionTypes.REMOVE_NOTE:
            return state.filter(id => id !== action.payload);
    
        case CheckedNotesActionTypes.REMOVE_ALL_NOTES:
            return []
    
        default:
            return state;
    }
}