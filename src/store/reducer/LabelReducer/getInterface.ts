
import { ILabel } from "./type";

export enum LabelGetActionType {
    FETCH__LABEL = 'FETCH__LABEL',
    FETCH__LABEL_SUCCESS = 'FETCH__LABEL_SUCCESS',
    FETCH__LABEL_ERROR = 'FETCH__LABEL_ERROR',
}



interface FetchLabelActions {
    type: LabelGetActionType.FETCH__LABEL;

}

interface FetchLabelSuccessActions {
    type: LabelGetActionType.FETCH__LABEL_SUCCESS;
    payload: ILabel[]

}

interface FetchLabelErrorActions {
    type: LabelGetActionType.FETCH__LABEL_ERROR;
    payload: null|string
}


export type LabelGetAction = FetchLabelActions | FetchLabelSuccessActions | FetchLabelErrorActions

