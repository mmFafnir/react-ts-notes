
import INote from "../../../types/note";
import ITaskNote from "../../../types/task";
import { ITrashNotes } from "./types";


export enum InitialTrashActionType {
    INITIAL_TRASH_NOTES = 'INITIAL_TRASH_NOTES',
    INITIAL_TRASH_NOTES__SUCCESS = 'INITIAL_TRASH_NOTES__SUCCESS',
    INITIAL_TRASH_NOTES__ERROR = 'INITIAL_TRASH_NOTES__ERROR',
}

interface InitialTrashAction {
    type: InitialTrashActionType.INITIAL_TRASH_NOTES;
}
interface InitialTrashSuccsesAction {
    type: InitialTrashActionType.INITIAL_TRASH_NOTES__SUCCESS;
    payload: ITrashNotes;
}

interface InitialTrashErrorAction {
    type: InitialTrashActionType.INITIAL_TRASH_NOTES__ERROR;
    payload: string
}





export type TrashInitialActions = InitialTrashAction | InitialTrashSuccsesAction | InitialTrashErrorAction;




