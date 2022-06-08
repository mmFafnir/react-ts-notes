
import axios from 'axios'
import { AnyAction, Dispatch } from 'redux'
import { ThunkDispatch } from 'redux-thunk';
import INote from '../../types/note';
import { NotesDeleteActionType } from '../reducer/NoteReducer/deleteInteface';
import { NotesGetAction, NotesGetActionType } from '../reducer/NoteReducer/getInteface';
import { NotesPostActionType } from '../reducer/NoteReducer/postInterface';
import { NotesPutActionType } from '../reducer/NoteReducer/putInterface';

export const fetchNotes = () => {
    return async (dispatch: any) => {
        try {
            dispatch({type: NotesGetActionType.FETCH__NOTES});
            const response = await axios.get('https://619d484e131c600017088e7d.mockapi.io/notes');

            dispatch({
                type: NotesGetActionType.FETCH__NOTES_SUCCESS,
                payload: response.data
            })
        } catch(e) {
            console.log(e)
            dispatch({
                type: NotesGetActionType.FETCH__NOTES_ERROR,
                payload: 'Произошла ошибка при загрузки заметок'
            })
        }
    }
}

export const postNotes = (note: INote) => {
    return async (dispatch: any) => {
        try {
            dispatch({type: NotesPostActionType.POST__NOTES});
            const response = await axios.post('https://619d484e131c600017088e7d.mockapi.io/notes', note);
            
            dispatch({
                type: NotesPostActionType.POST__NOTES_SUCCESS,
                payload: response.data
            })
        } catch(e) {
            dispatch({
                type: NotesPostActionType.POST__NOTES_ERROR,
                payload: 'Произошла ошибка при сохраранении заметок'
            })
        }
    }
}

export const deleteNotes = (id:string|number) => {
    return async (dispatch: any) => {
        try {
            dispatch({type: NotesDeleteActionType.DELETE__NOTES});
            const response = await axios.delete(`https://619d484e131c600017088e7d.mockapi.io/notes/${id}`);

            
            dispatch({
                type: NotesDeleteActionType.DELETE__NOTES_SUCCESS,
                payload: id
            })
        } catch(e) {
            console.log(e)
            dispatch({
                type: NotesDeleteActionType.DELETE__NOTES_ERROR,
                payload: 'Произошла ошибка при удалении заметок'
            })
        }
    }
}


export const PutNotes = (id:string, note:INote) => {
    return async (dispatch: any) => {
        try {
            dispatch({type: NotesPutActionType.PUT__NOTES});
            const response = await axios.put(`https://619d484e131c600017088e7d.mockapi.io/notes/${id}`, note);
            
            
            dispatch({
                type: NotesPutActionType.PUT__NOTES_SUCCESS,
                payload: response.data

            })
        } catch(e) {
            dispatch({
                type: NotesPutActionType.PUT__NOTES_ERROR,
                payload: 'Произошла ошибка при удалении заметок'
            })
        }
    }
}