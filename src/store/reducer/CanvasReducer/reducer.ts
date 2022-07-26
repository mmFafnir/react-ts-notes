import { CanvasActions, CanvasActionTypes } from "./Canvasinterface";


interface IState {
    canvas: HTMLCanvasElement|null;
    undo: string[];
    redo: string[];
    img: string|null;
}

const initialState:IState = {
    canvas: null, 
    undo: [],
    redo: [],
    img: null

}

export const canvasReducer = (state = initialState, action: CanvasActions) => {
    switch (action.type) { 
        case CanvasActionTypes.INITIAL_CANVAS: 
            return {canvas: action.payload, undo: [], redo: [], img:null}
        
        case CanvasActionTypes.PUSH_REDO: 
            return {canvas: state.canvas, undo: state.undo, redo: [...state.redo, action.payload], img: state.img}
        
        case CanvasActionTypes.PUSH_UNDO: 
            console.log('undo')
            return {canvas: state.canvas, undo: [...state.undo, action.payload], redo: state.redo, img: action.payload}

        default:
            return state
    }
}