

export interface ILabel {
    id:string,
    title: string,
    notes: string[],
} 

export interface ILabelState {
    data: ILabel[];
    loading: boolean;
    error: null|string
}
