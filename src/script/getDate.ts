export interface IDate {
    m: string;
    d: string;
    y: string|number;
}

const getDate = ():IDate => {
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();

    return {m:mm, d:dd, y:yyyy};
}
export default getDate