import { types } from "../../../components/FormCreateNote";
import INote from "../../../types/note";
import ITaskNote from "../../../types/task";
import { ContentActions, ContentActionType } from "./contentInterface"

type stateData = INote[] | ITaskNote[] 

interface IState {
    data: (INote|ITaskNote)[]
}

const initialState:IState = {
    data: []
}


export const contentReducer = (state = initialState, action: ContentActions) => {
    switch (action.type) {
        case ContentActionType.INITIAL_CONTENT:
            return {data: [...action.payload.notes, ...action.payload.tasks]};
        
        case ContentActionType.CHANGE_CONTENT:
            return {
                data: state.data.map((item) => {
                    if(item.type === action.payload.type && item.id === action.payload.id) return action.payload
                    return item
                })
            }
        
        case ContentActionType.DELETE_CONTENT:
            return {
                data: state.data?.filter(item => {
                    
                    // if(item.type === types.TASK && action.payload.replace(/tasks/ig,'') === item.id) {item.id = 'tasks'+item.id;}
                    // console.log(item.id == action.payload)
                    
                    if(item.id !== action.payload) return item   
                })
            };
            
        default:
            return state;
    }
}