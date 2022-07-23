import React from 'react';

import './style.scss';

const logoImg =  require('./logo.png');


const Logo = () => {
    return (
        <div className='logo'>
            <div className="logo__img">
                <img src={logoImg} alt="notes" />
            </div>
            <div className="logo__text">
                RNotes
            </div>
        </div>
    );
};

export default Logo;