import React, { FC, ReactNode, useTransition } from 'react';
import { useTypeSelector } from '../../hooks/useTypeSelector';

import './templatePage.scss';

interface IProps {
    children: ReactNode;
    classes?: string[];
    style?: object 
}

const TemplatePage:FC<IProps> = ({
    classes = [], children, style
}) => {
    
    const { width } = useTypeSelector(state => state.listStyle);
    return (
        <main
            style={{maxWidth: (width === '100%') ? '620px' : '', ...style }} 
            className={`tempalte ${classes.join(' ')}`}
        >
            {children}
        </main>
    );
};

export default TemplatePage;