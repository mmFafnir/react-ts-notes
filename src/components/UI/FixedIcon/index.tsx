import React, { FC, useState } from 'react';

import './style.scss'


interface IProps {
    classes?: string[],
    getValue: (fixed: boolean) => void
    defaultFixed: boolean
}


const FixedIcon:FC<IProps> = ({
    classes = [], getValue, defaultFixed
}) => {
    const [fixed, setFixed] = useState<boolean>(defaultFixed);
    const handlerClick = () => {
        setFixed(!fixed);
        getValue(!fixed)
    }
    return (
        <button 
            className={`fixed-icon ${fixed ? 'fixed' : 'no-fixed'} ${classes.join(' ')}`}
            onClick={handlerClick}
        >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                <path d="M32 32C32 14.33 46.33 0 64 0H320C337.7 0 352 14.33 352 32C352 49.67 337.7 64 320 64H290.5L301.9 212.2C338.6 232.1 367.5 265.4 381.4 306.9L382.4 309.9C385.6 319.6 383.1 330.4 377.1 338.7C371.9 347.1 362.3 352 352 352H32C21.71 352 12.05 347.1 6.04 338.7C.0259 330.4-1.611 319.6 1.642 309.9L2.644 306.9C16.47 265.4 45.42 232.1 82.14 212.2L93.54 64H64C46.33 64 32 49.67 32 32zM224 384V480C224 497.7 209.7 512 192 512C174.3 512 160 497.7 160 480V384H224z"/>
            </svg>
        </button>
    );
};

export default FixedIcon;