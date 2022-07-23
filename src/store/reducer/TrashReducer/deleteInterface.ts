
import INote from "../../../types/note";
import ITaskNote from "../../../types/task";

export enum DeleteTrashActionType {
    DELETE_TRASH_NOTES = 'DELETE_TRASH_NOTES',
    DELETE_TRASH_NOTES__SUCCESS = 'DELETE_TRASH_NOTES__SUCCESS',
    DELETE_TRASH_NOTES__ERROR = 'DELETE_TRASH_NOTES__ERROR',
}

interface DeleteTrashAction {
    type: DeleteTrashActionType.DELETE_TRASH_NOTES;
}
interface DeleteTrashSuccsesAction {
    type: DeleteTrashActionType.DELETE_TRASH_NOTES__SUCCESS;
    payload: string;
}

interface DeleteTrashErrorAction {
    type: DeleteTrashActionType.DELETE_TRASH_NOTES__ERROR;
    payload: string
}





export type TrashDeleteActions = DeleteTrashAction | DeleteTrashSuccsesAction | DeleteTrashErrorAction;




