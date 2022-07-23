import { ListStyleActions, ListStyleActionType } from "./ListStyleInterface";


interface IState {
    width: string|number
}

export const defaultWidth = 370

const initialState:IState = {
    width: defaultWidth
}


export const listStyleReducer = (state = initialState, action: ListStyleActions) => {
    switch (action.type) {
        case ListStyleActionType.CHANGE_WIDTH: 
            return {
                width: action.payload
            }
        default:
            return state;
    }
}