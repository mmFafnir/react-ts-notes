
import { ModalActions, ModalActionsType } from "./ModalInteface";
import { ModalState } from "./types";

const initialState: ModalState = {
    editLabelModal: false,
}


export const modalsReducer = (state = initialState, action:ModalActions):ModalState => {

    switch(action.type) {
        //Загрузка всех заметок
        case ModalActionsType.EDIT_LABEL_MODAL:
            state.editLabelModal = action.payload 
            return state
        
        

        default:
            return state
    }

}