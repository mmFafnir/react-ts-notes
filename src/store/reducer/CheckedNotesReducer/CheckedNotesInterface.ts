 
export enum CheckedNotesActionTypes {
    ADD_NOTE = 'ADD_NOTE',
    REMOVE_NOTE = 'REMOVE_NOTE',
    REMOVE_ALL_NOTES = 'REMOVE_ALL_NOTES',
}

interface AddChekedNotesAction {
    type:CheckedNotesActionTypes.ADD_NOTE,
    payload: string
}

interface RemoveChekedNotesAction {
    type:CheckedNotesActionTypes.REMOVE_NOTE,
    payload: string
}

interface RemoveAllChekedNotesAction {
    type:CheckedNotesActionTypes.REMOVE_ALL_NOTES,
}

export type CheckedNotesActions = AddChekedNotesAction | RemoveChekedNotesAction | RemoveAllChekedNotesAction