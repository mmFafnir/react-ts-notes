import INote from "../../../types/note";
import ITaskNote, { ITask } from "../../../types/task";


export enum ContentActionType {
    INITIAL_CONTENT = 'INITIAL_CONTENT',
    DELETE_CONTENT = 'DELETE_CONTENT',
    CHANGE_CONTENT = 'CHANGE_CONTENT',
}

interface InitialContentAction {
    type: ContentActionType.INITIAL_CONTENT;
    payload: {tasks:ITaskNote[], notes: INote[]}
}

interface DeleteContentAction {
    type: ContentActionType.DELETE_CONTENT;
    payload: string
}

interface ChangeContentAction {
    type: ContentActionType.CHANGE_CONTENT;
    payload: INote|ITaskNote

}



export type ContentActions = InitialContentAction | DeleteContentAction | ChangeContentAction;




