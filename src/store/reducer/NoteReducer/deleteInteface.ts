import INote from "../../../types/note";

export enum NotesDeleteActionType {
    DELETE__NOTES = 'DELETE__NOTES',
    DELETE__NOTES_SUCCESS = 'DELETE__NOTES_SUCCESS',
    DELETE__NOTES_ERROR = 'DELETE__NOTES_ERROR',

    REMOVE__NOTES = 'REMOVE__NOTES',
    REMOVE__NOTES_SUCCESS = 'REMOVE__NOTES__SUCCESS',
    REMOVE__NOTES_ERROR = 'REMOVE__NOTES__ERROR',

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


interface RemoveNotesActions {
    type: NotesDeleteActionType.REMOVE__NOTES;
}

interface RemoveNotesSuccessActions {
    type: NotesDeleteActionType.REMOVE__NOTES_SUCCESS;
    payload: INote;

}

interface RemoveNotesErrorActions {
    type: NotesDeleteActionType.REMOVE__NOTES_ERROR;
    payload: null|string
}

export type NotesDeleteAction = DeleteNotesActions | DeleteNotesSuccessActions | DeleteNotesErrorActions |
RemoveNotesActions | RemoveNotesSuccessActions | RemoveNotesErrorActions;




