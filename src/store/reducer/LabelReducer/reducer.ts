import { LabelDeleteAction, LabelDeleteActionType } from "./deleteInterface";
import { LabelGetAction, LabelGetActionType } from "./getInterface";
import { LabelPostAction, LabelPostActionType } from "./postInterface";
import { LabelPutAction, LabelPutActionType } from "./putInterface";
import { ILabelState } from "./type";


const initialState: ILabelState = {
    data: [],
    loading: false,
    error: null
}

type ActionType = LabelPutAction | LabelPostAction | LabelDeleteAction |LabelGetAction;

export const labelReducer = (state = initialState, action:ActionType):ILabelState => {

    switch(action.type) {
       
        //Загрузка всех тегов
        case LabelGetActionType.FETCH__LABEL:
            return {loading: true, error: null, data: state.data}
        
        case LabelGetActionType.FETCH__LABEL_SUCCESS:
            return {loading: false, error: null, data: action.payload}
            
        case LabelGetActionType.FETCH__LABEL_ERROR:
            return {loading: false, error: action.payload, data: []}
        

        // Добавление тега
        case LabelPostActionType.POST__LABEL:
            return {loading: true, error: null, data: state.data}
        
        case LabelPostActionType.POST__LABEL_SUCCESS:
            return {loading: false, error: null, data: [...state.data, action.payload] }
            
        case LabelPostActionType.POST__LABEL_ERROR:
            return {loading: false, error: action.payload, data: state.data}
        

        // Замена тега
        case LabelPutActionType.PUT__LABEL:
            return {loading: true, error: null, data: state.data}
        
        case LabelPutActionType.PUT__LABEL_SUCCESS:
            return {loading: false, error: null, data: state.data.map(tag => {
                if(tag.id === action.payload.id) return action.payload;
                return tag;
            }) }
            
        case LabelPutActionType.PUT__LABEL_ERROR:
            return {loading: false, error: action.payload, data: state.data}
            
        //Удаление заметок
        case LabelDeleteActionType.DELETE__LABEL:
            return {loading: true, error: null, data: state.data}
            
        case LabelDeleteActionType.DELETE__LABEL_SUCCESS:
            return {loading: false, error: null, data: state.data.filter(tag => tag.id !== action.payload)}
                
        case LabelDeleteActionType.DELETE__LABEL_ERROR:
            return {loading: false, error: action.payload, data: state.data}
            

        default:
            return state
    }

}