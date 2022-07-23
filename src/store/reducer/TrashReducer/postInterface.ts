
import INote from "../../../types/note";
import ITaskNote from "../../../types/task";

export enum postTrashActionType {
    POST_TRASH_NOTES = 'POST_TRASH_NOTES',
    POST_TRASH_NOTES__SUCCESS = 'POST_TRASH_NOTES__SUCCESS',
    POST_TRASH_NOTES__ERROR = 'POST_TRASH_NOTES__ERROR',
}

interface postTrashAction {
    type: postTrashActionType.POST_TRASH_NOTES;
}
interface postTrashSuccsesAction {
    type: postTrashActionType.POST_TRASH_NOTES__SUCCESS;
    payload: INote|ITaskNote;
}

interface postTrashErrorAction {
    type: postTrashActionType.POST_TRASH_NOTES__ERROR;
    payload: string
}





export type TrashPostActions = postTrashAction | postTrashSuccsesAction | postTrashErrorAction;




