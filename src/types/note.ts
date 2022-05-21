import IImg from "./img";

export default interface INote {
    id: string;
    title: string;
    text: string;
    time: string|number;
    color?: string;
    change?: string|number;
    images?: IImg[];
    type: string

}
