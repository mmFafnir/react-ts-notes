import IImg from "./img";


export default interface ITaskNote {
    id: string;
    title: string;
    tasks:ITask[];
    time: string|number;
    color?: string;
    change?: string|number;
    images?: IImg[];
    type: string
     
}

export interface ITask {
    id: string;
    value: string;
    checked: boolean;
}
