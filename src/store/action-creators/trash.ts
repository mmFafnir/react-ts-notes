
import { types } from "../../components/FormCreateNote";
import { getStorage, setStorage } from "../../script/localStorage";
import INote from "../../types/note";
import ITaskNote from "../../types/task";
import { DeleteTrashActionType } from "../reducer/TrashReducer/deleteInterface";
import { InitialTrashActionType } from "../reducer/TrashReducer/initialInterface";
import { postTrashActionType } from "../reducer/TrashReducer/postInterface";
import { ITrashNotes } from "../reducer/TrashReducer/types";
import { postNotes } from "./notes";
import { postTasks } from "./tasks";


export const initialTrashNotes = () => {
    return async (dispatch: any) => {
        try {
            dispatch({type: InitialTrashActionType.INITIAL_TRASH_NOTES});
            
            // const response = await axios.get(`${baseUrl}/trash`);
            const data = getStorage('trash') ? getStorage('trash') : [];
            
            dispatch({
                type: InitialTrashActionType.INITIAL_TRASH_NOTES__SUCCESS,
                payload: data
            })
        } catch(e) {
            console.log(e)
            dispatch({
                type: InitialTrashActionType.INITIAL_TRASH_NOTES__ERROR,
                payload: 'Произошла ошибка при загрузки удаленных заметок'
            })
        }
    }
}


export const PostTrashNotes = (note:INote|ITaskNote) => {
    return async (dispatch: any) => {
        try {
            dispatch({type: postTrashActionType.POST_TRASH_NOTES});
            
            // const response = await axios.post(`${baseUrl}/trash`);
            const data:ITrashNotes = getStorage('trash') ? getStorage('trash') : [];
            setStorage('trash', [note, ...data]);

            dispatch({
                type: postTrashActionType.POST_TRASH_NOTES__SUCCESS,
                payload: note
            })
        } catch(e) {
            console.log(e)
            dispatch({
                type: postTrashActionType.POST_TRASH_NOTES__ERROR,
                payload: 'Произошла ошибка при добавлении заметки в корзину'
            })
        }
    }
}



export const DeleteTrashNotes = (id: string) => {
    return async (dispatch: any) => {
        try {
            dispatch({type: DeleteTrashActionType.DELETE_TRASH_NOTES});
            
            // const response = await axios.delete(`${baseUrl}/trash:id`);
            const data:ITrashNotes = getStorage('trash') ? getStorage('trash') : [];
            console.log(data.filter(note => note.id !== id))
            setStorage('trash', data.filter(note => note.id !== id));

            dispatch({
                type: DeleteTrashActionType.DELETE_TRASH_NOTES__SUCCESS,
                payload: id
            })
        } catch(e) {
            console.log(e)
            dispatch({
                type: DeleteTrashActionType.DELETE_TRASH_NOTES__ERROR,
                payload: 'Произошла ошибка при удалении заметки'
            })
        }
    }
}

export const RestoreTrashNotes = (note:INote|ITaskNote) => {
    return async (dispatch:any) => {
        try {
            if(note.type === types.NOTE) {
                dispatch(postNotes(note as INote))
            } else if (note.type === types.TASK) {
                dispatch(postTasks(note as ITaskNote))
            }
            dispatch(DeleteTrashNotes(note.id))
        } catch (e) {
            console.log(e)
        }
    }
}