import INote from "../../../types/note";
import ITaskNote from "../../../types/task";

export enum CurrentNoteActionTypes  {
    SET_CURRENT_NOTE = 'SET_CURRENT_NOTE'
}

interface SetCurrentNoteAction  {
    type: CurrentNoteActionTypes.SET_CURRENT_NOTE,
    payload: (ITaskNote|INote)
}

type CurrentNoteActions = SetCurrentNoteAction 

const initialState:(ITaskNote|INote)|null = null;

export const currentNoteReducer = (state = initialState, action: CurrentNoteActions) => {
    switch (action.type) {
        case CurrentNoteActionTypes.SET_CURRENT_NOTE:
            return action.payload
    
        default:
            return state
    }
}