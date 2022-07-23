import { ILabel } from "./type";


export enum LabelPutActionType {
    PUT__LABEL = 'PUT__LABEL',
    PUT__LABEL_SUCCESS = 'PUT__LABEL_SUCCESS',
    PUT__LABEL_ERROR = 'PUT__LABEL_ERROR',
}


interface PutLabelActions {
    type: LabelPutActionType.PUT__LABEL;

}

interface PutLabelSuccessActions {
    type: LabelPutActionType.PUT__LABEL_SUCCESS;
    payload: ILabel

}

interface PutLabelErrorActions {
    type: LabelPutActionType.PUT__LABEL_ERROR;
    payload: null|string
}


export type LabelPutAction = PutLabelActions | PutLabelSuccessActions | PutLabelErrorActions

