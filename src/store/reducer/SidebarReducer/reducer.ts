import checkDevice, { device } from "../../../script/checkDevice"


export enum SidebarActionTypes {
    TOGGLE_OPEN = 'TOGGLE_OPEN'
}

interface ToggleSidebarAction {
    type:SidebarActionTypes.TOGGLE_OPEN
}

type SidebarActions = ToggleSidebarAction

const initialState:boolean = (checkDevice() === device.DESKTOP) ? true : false




export const sidebarReducer = (state = initialState , action:SidebarActions) => {
    switch (action.type) {
        case SidebarActionTypes.TOGGLE_OPEN:
            return !state
    
        default:
            return state
    }
}