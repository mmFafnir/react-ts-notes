import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import './modalColor.scss'


interface Props { 
    getColor: (color: string) => void
}
const ModalColor: FC<Props> = ({
    getColor
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
    const changeColor = (color: string) => {
        setCurrentColor(color);
            getColor(color)
    } 

    return (
        <div className='modal-color'>
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