import React from 'react';

// import gif from './XOsX.gif';
import './style.scss';

const Loading = () => {
    return (
        <div className='loading anim-opacity'>
            <div className="loading__wrapper">
                <img src={require('./XOsX.gif')} alt="" />
            </div>
        </div>
    );
};

export default Loading;