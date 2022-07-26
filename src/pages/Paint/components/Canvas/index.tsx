import React, { FC, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { CanvasActionTypes } from '../../../../store/reducer/CanvasReducer/Canvasinterface';


const Canvas:FC = () => {

    const dispatch = useDispatch<any>()

    const canvasRef = useRef<HTMLCanvasElement|null>(null)
    

    const undoPushHandler = () => {
        dispatch({
            type: CanvasActionTypes.PUSH_UNDO,
            payload: canvasRef.current?.toDataURL()
        })
    }

    const canvasSizeHandker = () => {
        if(!canvasRef.current) return
        canvasRef.current.width = window.innerWidth - 20;
        canvasRef.current.height = window.innerHeight - 105;
    }
    useEffect(() => {
        if(canvasRef.current) {
            canvasSizeHandker()
            dispatch({
                type: CanvasActionTypes.INITIAL_CANVAS,
                payload: canvasRef.current
            })
        }
        window.addEventListener('resize', canvasSizeHandker);

        return () => {
            window.removeEventListener('resize', canvasSizeHandker);
        }
    }, [])

    return (
        <div className='canvas'>
            <canvas ref={canvasRef} onMouseUp={undoPushHandler}  />
        </div>
    );
};

export default Canvas;