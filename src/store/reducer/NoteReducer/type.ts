import INote from "../../../types/note";



export interface NotesState {
    data: INote[];
    loading: boolean;
    error: null|string
}
