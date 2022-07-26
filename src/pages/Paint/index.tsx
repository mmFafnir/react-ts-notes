import React, { useState } from 'react';
import Canvas from './components/Canvas';
import Toolbar from './components/Toolbar';

import './paint.scss';



const Paint = () => {


    
    return (
        <div className='paint'>
            <Toolbar  />
            <div className="paint__wrapper">
                <Canvas />
            </div>
        </div>
    );
};

export default Paint;