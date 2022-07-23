
import { ILabel } from "./type";

export enum LabelPostActionType {
    POST__LABEL = 'POST__LABEL',
    POST__LABEL_SUCCESS = 'POST__LABEL_SUCCESS',
    POST__LABEL_ERROR = 'POST__LABEL_ERROR',
}



interface PostLabelActions {
    type: LabelPostActionType.POST__LABEL;

}

interface PostLabelSuccessActions {
    type: LabelPostActionType.POST__LABEL_SUCCESS;
    payload: ILabel

}

interface PostLabelErrorActions {
    type: LabelPostActionType.POST__LABEL_ERROR;
    payload: null|string
}


export type LabelPostAction = PostLabelActions | PostLabelSuccessActions | PostLabelErrorActions

