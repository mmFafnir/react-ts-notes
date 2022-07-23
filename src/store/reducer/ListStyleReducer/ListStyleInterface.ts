

export enum ListStyleActionType {
    CHANGE_WIDTH = 'CHANGE_WIDTH',
}

interface ChangeListStyleAction {
    type: ListStyleActionType.CHANGE_WIDTH;
    payload: string|number
}





export type ListStyleActions = ChangeListStyleAction;




