import INote from "../../../types/note";

export enum NotesPostActionType {
    POST__NOTES = 'POST__NOTES',
    POST__NOTES_SUCCESS = 'POST__NOTES_SUCCESS',
    POST__NOTES_ERROR = 'POST__NOTES_ERROR'
}


interface PostNotesActions {
    type: NotesPostActionType.POST__NOTES;

}

interface PostNotesSuccessActions {
    type: NotesPostActionType.POST__NOTES_SUCCESS;
    payload: INote

}

interface PostNotesErrorActions {
    type: NotesPostActionType.POST__NOTES_ERROR;
    payload: null|string
}


export type NotesPostAction = PostNotesActions | PostNotesSuccessActions | PostNotesErrorActions;




