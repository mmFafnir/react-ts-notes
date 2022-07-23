import INote from "../../../types/note";
import ITaskNote from "../../../types/task";


export type ITrashNotes = (INote|ITaskNote)[];

export interface IState  {
    data: ITrashNotes;
    loading: boolean;
    error: null|string
}