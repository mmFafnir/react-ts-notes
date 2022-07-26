import React, { Dispatch, FC, SetStateAction, useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTypeSelector } from '../../../../hooks/useTypeSelector';
import { CanvasActionTypes } from '../../../../store/reducer/CanvasReducer/Canvasinterface';
import Brush from '../../tools/Brush';
import Circle from '../../tools/Circle';
import Eraser from '../../tools/Eraser';
import Line from '../../tools/Line';
import Rect from '../../tools/Rect';


import './toolbar.scss';




const Toolbar:FC = () => {
    
    const navigate = useNavigate();

    const dispatch = useDispatch<any>();


    const { canvas, undo, redo } = useTypeSelector(state => state.canvas);

    const [tool, setTool] = useState<any>(null);
    const [lineWidth, setLineWidth] = useState<number>(1);
    const [fillColor, setFillColor] = useState<string>('#000');
    const [strokeColor, setStrokeColor] = useState<string>('#000');

    const fillColorHandler = (color: string) => {
        setFillColor(color)
        tool.fillColor = color
        
    }
    
    const strokeColorHandler = (color: string) => {
        setStrokeColor(color);
        tool.strokeColor = color;
    }

    const lineWidthHandler = (width:number) => {
        if(width > 20) {
            tool.lineWidth = 20;
            setLineWidth(20)
            return    
        }
        if(width <= 0) {
            setLineWidth(1)
            tool.lineWidth = 1;
            return    
        }
        tool.lineWidth = Number(width)
        setLineWidth(width)
    }


    const clickUndoHandler = () => {
        if(!canvas) return
        let ctx = canvas.getContext('2d');
        if(undo.length > 0) {
            let dataURL = undo.pop();
            dispatch({
                type: CanvasActionTypes.PUSH_REDO,
                payload: dataURL 
            })
            let img = new Image();
            img.src = dataURL!;
            img.onload = () => {
                ctx?.clearRect(0, 0, canvas.width, canvas.height);
                ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
            }
        } else {
            ctx!.clearRect(0,0, canvas.width, canvas.height)
        }
            
    }

    const clickRedoHandler = () => {
        if(!canvas) return
        let ctx = canvas.getContext('2d');
        if(redo.length > 0) {
            let dataURL = redo.pop();
            dispatch({
                type: CanvasActionTypes.PUSH_UNDO,
                payload: dataURL 
            })
            let img = new Image();
            img.src = dataURL!;
            img.onload = () => {
                ctx?.clearRect(0, 0, canvas.width, canvas.height);
                ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
            }
        }
            
    }

    const sevaCanvasImg = useCallback(() => {
        const dataUrl = canvas?.toDataURL(); 
        if(!dataUrl) return;
        let link = document.createElement('a');
        link.target = "_blank";
        link.download = 'paint';
        link.href = dataUrl;
        link.click();
        
    }, [])

    const goBackHandler = () => {
        navigate("/", { state:  "/paint" });
    }

    useEffect(() => {
        if(tool) {
            fillColorHandler(fillColor);
            strokeColorHandler(strokeColor);
            tool.ctx.lineWidth = lineWidth;
        }
    }, [tool])    

    useEffect(() => {
        if(canvas) {
            setTool(new Brush(canvas))
        }
    }, [canvas])

    return (
        <div className='toolbar'>
            <div className="toolbar__wrapper">
                <div className="toolbar__left">
                    <button onClick={goBackHandler}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                            <path d="M447.1 256C447.1 273.7 433.7 288 416 288H109.3l105.4 105.4c12.5 12.5 12.5 32.75 0 45.25C208.4 444.9 200.2 448 192 448s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L109.3 224H416C433.7 224 447.1 238.3 447.1 256z"/>
                        </svg>
                    </button>
                    <button onClick={() => canvas ? setTool(new Brush(canvas)) : null}>
                        <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M23.4761 0.227766C23.6579 0.0649669 23.8848 -0.0151916 24.114 0.00238078C24.3432 0.0199532 24.5589 0.134044 24.7206 0.323176C24.8818 0.507435 24.98 0.752993 24.9972 1.01459C25.0145 1.27619 24.9496 1.5362 24.8145 1.74669C23.2654 4.16629 18.2595 11.8468 14.2363 16.5085C13.0675 17.8633 11.8987 18.8804 11.023 19.554C10.1867 20.2009 9.10189 20.0005 8.39075 19.1781C7.70595 18.3843 7.51828 17.1802 8.04176 16.2337C8.61133 15.1995 9.5019 13.8046 10.7448 12.4612C14.8947 7.97696 21.4053 2.08063 23.4761 0.227766Z" fill="black"/>
                            <path d="M9.95628 21.1836C9.95628 22.1958 9.60941 23.1665 8.99198 23.8822C8.37455 24.5979 7.53714 25 6.66396 25C5.0178 25 3.37165 25 0.902409 24.0459C-1.56683 23.0918 1.72549 22.1377 2.54857 21.1836C3.37165 20.2295 4.84496 17.3672 6.66396 17.3672C7.53714 17.3672 8.37455 17.7693 8.99198 18.485C9.60941 19.2007 9.95628 20.1714 9.95628 21.1836Z" fill="black"/>
                        </svg>
                    </button>

                    <button onClick={() => canvas ? setTool(new Rect(canvas)) : null}>
                        <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 3.125C0 2.2962 0.32924 1.50134 0.915291 0.915291C1.50134 0.32924 2.2962 0 3.125 0L21.875 0C22.7038 0 23.4987 0.32924 24.0847 0.915291C24.6708 1.50134 25 2.2962 25 3.125V21.875C25 22.7038 24.6708 23.4987 24.0847 24.0847C23.4987 24.6708 22.7038 25 21.875 25H3.125C2.2962 25 1.50134 24.6708 0.915291 24.0847C0.32924 23.4987 0 22.7038 0 21.875V3.125Z" fill="black"/>
                        </svg>
                    </button>

                    <button onClick={() => canvas ? setTool(new Circle(canvas)) : null}>
                        <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M12.5 23.4375C15.4008 23.4375 18.1828 22.2852 20.234 20.234C22.2852 18.1828 23.4375 15.4008 23.4375 12.5C23.4375 9.59919 22.2852 6.8172 20.234 4.76602C18.1828 2.71484 15.4008 1.5625 12.5 1.5625C9.59919 1.5625 6.8172 2.71484 4.76602 4.76602C2.71484 6.8172 1.5625 9.59919 1.5625 12.5C1.5625 15.4008 2.71484 18.1828 4.76602 20.234C6.8172 22.2852 9.59919 23.4375 12.5 23.4375ZM12.5 25C15.8152 25 18.9946 23.683 21.3388 21.3388C23.683 18.9946 25 15.8152 25 12.5C25 9.18479 23.683 6.00537 21.3388 3.66117C18.9946 1.31696 15.8152 0 12.5 0C9.18479 0 6.00537 1.31696 3.66117 3.66117C1.31696 6.00537 0 9.18479 0 12.5C0 15.8152 1.31696 18.9946 3.66117 21.3388C6.00537 23.683 9.18479 25 12.5 25Z" fill="black"/>
                        </svg>
                    </button>

                    <button onClick={() => canvas ? setTool(new  Eraser(canvas)) : null}>
                        <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M25 7.89269C24.9992 7.60318 24.9436 7.31669 24.8364 7.04977C24.7292 6.78284 24.5725 6.54075 24.3754 6.33748L18.9545 0.622084C18.5535 0.222743 18.021 0 17.4673 0C16.9136 0 16.381 0.222743 15.9801 0.622084L0.617192 16.6641C0.224855 17.0777 0.00470951 17.6367 0.00470951 18.2193C0.00470951 18.8019 0.224855 19.3609 0.617192 19.7745L4.11214 23.4448H0.743605C0.546389 23.4448 0.35725 23.5267 0.217797 23.6725C0.0783438 23.8184 0 24.0162 0 24.2224C0 24.4286 0.0783438 24.6264 0.217797 24.7722C0.35725 24.9181 0.546389 25 0.743605 25H19.3337C19.5309 25 19.7201 24.9181 19.8595 24.7722C19.999 24.6264 20.0773 24.4286 20.0773 24.2224C20.0773 24.0162 19.999 23.8184 19.8595 23.6725C19.7201 23.5267 19.5309 23.4448 19.3337 23.4448H10.9607L24.3456 9.4479C24.5482 9.24723 24.7103 9.00631 24.8227 8.73926C24.9351 8.47222 24.9953 8.18441 25 7.89269ZM8.85634 23.4448H6.21654L1.67311 18.6936C1.61488 18.6329 1.56868 18.5608 1.53715 18.4814C1.50562 18.402 1.48939 18.3169 1.48939 18.2309C1.48939 18.145 1.50562 18.0599 1.53715 17.9805C1.56868 17.9011 1.61488 17.829 1.67311 17.7683L5.77038 13.4759L12.0836 20.07L8.85634 23.4448ZM23.3269 8.3126L13.1321 18.9736L6.82629 12.3717L17.0137 1.71851C17.1327 1.59922 17.2912 1.53262 17.4561 1.53262C17.621 1.53262 17.7795 1.59922 17.8986 1.71851L23.3269 7.38725C23.4448 7.51135 23.5116 7.67885 23.5128 7.85381C23.5128 7.93942 23.4964 8.02416 23.4645 8.10298C23.4325 8.1818 23.3857 8.25309 23.3269 8.3126Z" fill="black"/>
                        </svg>
                    </button>

                    <button onClick={() => canvas ? setTool(new  Line(canvas)) : null}>
                        <svg width="22" height="19" viewBox="0 0 22 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19.1274 0.158655L0.193206 15.7068C0.0869428 15.7941 0.0951929 15.9814 0.21154 16.1231L1.69232 17.9263C1.80866 18.068 1.9908 18.1126 2.09706 18.0253L21.0313 2.47713C21.1375 2.38987 21.1293 2.20255 21.0129 2.06087L19.5322 0.257609C19.4158 0.115924 19.2337 0.0713948 19.1274 0.158655Z" fill="black"/>
                        </svg>
                    </button>

                    <input className='color' type="color" value={fillColor} onChange={(e) => fillColorHandler(e.target.value)}/>
                </div>

                <div className="toolbar__right">
                    <button onClick={clickUndoHandler}>
                        <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.8125 9.61538H17.1875C19.7719 9.61538 21.875 12.2038 21.875 15.3846C21.875 18.5654 19.7719 21.1538 17.1875 21.1538H12.5V25H17.1875C21.4953 25 25 20.6865 25 15.3846C25 10.0827 21.4953 5.76923 17.1875 5.76923H7.8125V0L0 7.69231L7.8125 15.3846V9.61538Z" fill="black"/>
                        </svg>
                    </button>
                    
                    <button onClick={clickRedoHandler}>
                        <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.8125 25H12.5V21.1538H7.8125C5.22813 21.1538 3.125 18.5654 3.125 15.3846C3.125 12.2038 5.22813 9.61538 7.8125 9.61538H17.1875V15.3846L25 7.69231L17.1875 0V5.76923H7.8125C3.50469 5.76923 0 10.0827 0 15.3846C0 20.6865 3.50469 25 7.8125 25Z" fill="black"/>
                        </svg>
                    </button>
                    
                    <button onClick={sevaCanvasImg}>
                        <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M24.4156 5.66562L19.3344 0.584375C19.1 0.35 18.8125 0.178125 18.5 0.0843749V0H1C0.446875 0 0 0.446875 0 1V24C0 24.5531 0.446875 25 1 25H24C24.5531 25 25 24.5531 25 24V7.07812C25 6.54688 24.7906 6.04062 24.4156 5.66562ZM8.5 2.25H16.5V5.5H8.5V2.25ZM22.75 22.75H2.25V2.25H6.5V6.5C6.5 7.05312 6.94688 7.5 7.5 7.5H17.5C18.0531 7.5 18.5 7.05312 18.5 6.5V2.93125L22.75 7.18125V22.75ZM12.5 10.3125C10.0156 10.3125 8 12.3281 8 14.8125C8 17.2969 10.0156 19.3125 12.5 19.3125C14.9844 19.3125 17 17.2969 17 14.8125C17 12.3281 14.9844 10.3125 12.5 10.3125ZM12.5 17.3125C11.1187 17.3125 10 16.1938 10 14.8125C10 13.4312 11.1187 12.3125 12.5 12.3125C13.8813 12.3125 15 13.4312 15 14.8125C15 16.1938 13.8813 17.3125 12.5 17.3125Z" fill="black"/>
                        </svg>
                    </button>
                </div>
            </div>
            <div className="setting-width">
                <div>
                    <label htmlFor="lineWidth">Толщина линии:</label>
                    <input 
                        type="number" 
                        onChange={(e) => lineWidthHandler(Number(e.target.value))}
                        id='lineWidth'
                        value={lineWidth} 
                        min={1} 
                        max={20} 
                    />
                </div>
                <div >
                    <label htmlFor="strokeColor">Цвет обводки:</label>
                    <input 
                        className='color'
                        onChange={(e) => strokeColorHandler(e.target.value)}
                        value={strokeColor} 
                        type="color" 
                        id='strokeColor'  />
                </div>
            </div>
        </div>
    );
};

export default Toolbar;