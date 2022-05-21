import React from 'react';
import './style.scss'

const Logo = () => {
    return (
        <div className='logo'>
            <div className="logo__img">
                <img src="https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png" alt="notes" />
            </div>
            <div className="logo__text">
                Notes
            </div>
        </div>
    );
};

export default Logo;