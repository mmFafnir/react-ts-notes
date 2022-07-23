import { useTypeSelector } from "../../hooks/useTypeSelector";
import { getStorage, setStorage } from "../../script/localStorage";
import { ContentActionType } from "../reducer/ContentReducer/contentInterface";
import { LabelDeleteActionType } from "../reducer/LabelReducer/deleteInterface";
import { LabelGetActionType } from "../reducer/LabelReducer/getInterface";
import { LabelPostActionType } from "../reducer/LabelReducer/postInterface";
import { LabelPutActionType } from "../reducer/LabelReducer/putInterface";
import { ILabel } from "../reducer/LabelReducer/type";




export const fetchLabel = () => {
    return async (dispatch: any) => {
        try {
            dispatch({type: LabelGetActionType.FETCH__LABEL});
            // const response = await axios.get(`${baseUrl}/labels`);
            const data = getStorage('labels') ? getStorage('labels') : [];
            
            console.log(data)
            dispatch({
                type: LabelGetActionType.FETCH__LABEL_SUCCESS,
                payload: data
            })
        } catch(e) {
            console.log(e)
            dispatch({
                type: LabelGetActionType.FETCH__LABEL_ERROR,
                payload: 'Произошла ошибка при загрузки тегов'
            })
        }
    }
}

export const postLabel = (label: ILabel) => {
    return async (dispatch: any) => {
        try {
            dispatch({type: LabelPostActionType.POST__LABEL});
            // const response = await axios.post(`${baseUrl}/labels`, task);

            const data = getStorage('labels') ? getStorage('labels') : [];  
            setStorage('labels', [...data, label])
            
            dispatch({
                type: LabelPostActionType.POST__LABEL_SUCCESS,
                payload: label
            })
        } catch(e) {
            dispatch({
                type: LabelPostActionType.POST__LABEL_ERROR,
                payload: 'Произошла ошибка при сохранение тугов'
            })
        }
    }
}

export const deleteLabel = (id:string|number) => {
    
    return async (dispatch: any) => {
        try {
            dispatch({type: LabelDeleteActionType.DELETE__LABEL});
            // const response = await axios.delete(`${baseUrl}/labels/${id}`);
            
            const data = getStorage('labels');
            
            
            setStorage('labels', data.filter((label:ILabel) => label.id !== id));
            dispatch({
                type: LabelDeleteActionType.DELETE__LABEL_SUCCESS,
                payload: id
            })
        } catch(e) {
            console.log(e)
            dispatch({
                type: LabelDeleteActionType.DELETE__LABEL_ERROR,
                payload: 'Произошла ошибка при удалении тега'
            })
        }
    }
}


export const PutLabel = (label:ILabel) => {
    return async (dispatch: any) => {
        try {
            dispatch({type: LabelPutActionType.PUT__LABEL});
            // const response = await axios.put(`${baseUrl}/labels/${id}`, task);
            const data = getStorage('labels');
            setStorage('labels', data.map((item:ILabel) => {
                if(item.id == label.id) return label;
                return item
            }))         
            // console.log(response)
            dispatch({
                type: LabelPutActionType.PUT__LABEL_SUCCESS,
                payload: label
            })
        } catch(e) {
            dispatch({
                type: LabelPutActionType.PUT__LABEL_ERROR,
                payload: 'Произошла ошибка при удалении тега'
            })
        }
    }
}

