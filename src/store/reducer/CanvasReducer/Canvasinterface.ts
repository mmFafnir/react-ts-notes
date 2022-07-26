
export enum CanvasActionTypes {
    INITIAL_CANVAS = 'INITIAL_CANVAS', 
    PUSH_UNDO = 'PUSH_UNDO',
    PUSH_REDO = 'PUSH_REDO',
    UNDO = 'UNDO',
    REDO = 'REDO'
}

interface CanvasInitialAction {
    type: CanvasActionTypes.INITIAL_CANVAS,
    payload: HTMLCanvasElement
}

interface CanvasPushUndoAction {
    type: CanvasActionTypes.PUSH_UNDO,
    payload: string
}

interface CanvasPushRedoAction {
    type: CanvasActionTypes.PUSH_REDO,
    payload: string
}

interface CanvasUndoAction {
    type: CanvasActionTypes.UNDO,
}

interface CanvasRedoAction {
    type: CanvasActionTypes.REDO,
}

export type CanvasActions = CanvasInitialAction | CanvasPushUndoAction | CanvasPushRedoAction | CanvasUndoAction | CanvasRedoAction;