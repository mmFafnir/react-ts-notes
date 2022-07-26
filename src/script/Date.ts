export interface IDate {
    m: string;
    d: string;
    y: string|number;
}

export const getDate = ():IDate => {
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();

    return {m:mm, d:dd, y:yyyy};
}

export const msToDay = (ms: number) => {
    let minutes = Math.floor(ms / 60000);
    let hours = Math.round(minutes / 60);
    let days = Math.round(hours / 24);

    return days
}