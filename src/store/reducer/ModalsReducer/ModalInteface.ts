export enum ModalActionsType {
    EDIT_LABEL_MODAL = "EDIT_LABEL_MODAL",
}

interface toggleEditLabelAction {
    type: ModalActionsType.EDIT_LABEL_MODAL;
    payload: boolean
}

export type ModalActions = toggleEditLabelAction