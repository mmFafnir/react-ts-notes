import INote from "../../../types/note";

export enum NotesDeleteActionType {
    DELETE__NOTES = 'DELETE__NOTES',
    DELETE__NOTES_SUCCESS = 'DELETE__NOTES_SUCCESS',
    DELETE__NOTES_ERROR = 'DELETE__NOTES_ERROR'
}


interface DeleteNotesActions {
    type: NotesDeleteActionType.DELETE__NOTES;
}

interface DeleteNotesSuccessActions {
    type: NotesDeleteActionType.DELETE__NOTES_SUCCESS;
    payload: string|number

}

interface DeleteNotesErrorActions {
    type: NotesDeleteActionType.DELETE__NOTES_ERROR;
    payload: null|string
}


export type NotesDeleteAction = DeleteNotesActions | DeleteNotesSuccessActions | DeleteNotesErrorActions;




