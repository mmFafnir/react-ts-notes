import INote from "../../../types/note";

export enum NotesPutActionType {
    PUT__NOTES = 'PUT__NOTES',
    PUT__NOTES_SUCCESS = 'PUT__NOTES_SUCCESS',
    PUT__NOTES_ERROR = 'PUT__NOTES_ERROR'
}


interface PutNotesActions {
    type: NotesPutActionType.PUT__NOTES;
}

interface PutNotesSuccessActions {
    type: NotesPutActionType.PUT__NOTES_SUCCESS;
    payload:INote

}

interface PutNotesErrorActions {
    type: NotesPutActionType.PUT__NOTES_ERROR;
    payload: null|string
}


export type NotesPutAction = PutNotesActions | PutNotesSuccessActions | PutNotesErrorActions;




