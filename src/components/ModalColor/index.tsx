import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import './modalColor.scss'


interface Props { 
    getColor: (color: string) => void;
    closeModal: Dispatch<SetStateAction<boolean>>;
}
const ModalColor: FC<Props> = ({
    getColor, closeModal
}) => {
    const colors = [
        '#f28b82',
        '#fbbc04',
        '#fff475',
        '#ccff90',
        '#a7ffeb',
        '#aecbfa',
        '#d7aefb',
        '#fdcfe8',
        '#e6c9a8',
        '#e8eaed'
    ]

    const [currentColor, setCurrentColor] = useState<string>('#fff');
    const [animClass, setAnimClass] = useState<string>('')
    const changeColor = (color: string) => {
        setCurrentColor(color);
        getColor(color)
    }
    
    
    useEffect(() => {
        function clickOutside(e:MouseEvent){
            console.log(e.target)
            const target = e.target as HTMLElement;
            if(!target.closest('.modal-color') && !target.closest('.color')) {
                setAnimClass('close')
                setTimeout(() => closeModal(false), 500);
            }
            
        }
        setTimeout(() => setAnimClass('active'), 200)
        
        document.addEventListener('click', clickOutside)
        return () => {
            document.removeEventListener('click', clickOutside)

        }
    }, [])

    return (
        <div className={`modal-color ${animClass}`}>
            <div className="modal-color__wrapper">
                <div className="modal-color__body">
                    <button onClick={() => changeColor('#fff')} className={currentColor == '#fff' ? 'active' : ''} style={{backgroundColor: '#fff'}}></button>
                    {
                        colors.map((colorKod, index) => (
                            <button
                                onClick={() => changeColor(colorKod)} 
                                className={currentColor === colorKod ? 'active' : ''} 
                                key={index} 
                                style={{backgroundColor: colorKod}}
                            ></button>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default ModalColor;