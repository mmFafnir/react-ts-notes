
import INote from "../../../types/note";
import { NotesState } from "./type";

export enum NotesGetActionType {
    FETCH__NOTES = 'FETCH__NOTES',
    FETCH__NOTES_SUCCESS = 'FETCH__NOTES_SUCCESS',
    FETCH__NOTES_ERROR = 'FETCH__NOTES_ERROR'
}



interface FetchNotesActions {
    type: NotesGetActionType.FETCH__NOTES;

}

interface FetchNotesSuccessActions {
    type: NotesGetActionType.FETCH__NOTES_SUCCESS;
    payload: INote[]

}

interface FetchNotesErrorActions {
    type: NotesGetActionType.FETCH__NOTES_ERROR;
    payload: null|string
}


export type NotesGetAction = FetchNotesActions | FetchNotesSuccessActions | FetchNotesErrorActions;

