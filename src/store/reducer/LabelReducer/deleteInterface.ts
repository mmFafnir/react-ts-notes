

export enum LabelDeleteActionType {
    DELETE__LABEL = 'DELETE__LABEL',
    DELETE__LABEL_SUCCESS = 'DELETE__LABEL_SUCCESS',
    DELETE__LABEL_ERROR = 'DELETE__LABEL_ERROR',
}



interface DeleteLabelActions {
    type: LabelDeleteActionType.DELETE__LABEL;

}

interface DeleteLabelSuccessActions {
    type: LabelDeleteActionType.DELETE__LABEL_SUCCESS;
    payload: string

}

interface DeleteLabelErrorActions {
    type: LabelDeleteActionType.DELETE__LABEL_ERROR;
    payload: null|string
}


export type LabelDeleteAction = DeleteLabelActions | DeleteLabelSuccessActions | DeleteLabelErrorActions

