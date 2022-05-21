import React from 'react';
import { FC } from 'react';
import BurgerIcon from '../UI/BurgerIcon';
import Logo from '../UI/Logo';
import Search from '../UI/Search';
import './header.scss'

const Header:FC = () => {
    return (
        <div className='header'>
            <div className="header__wrapper">
                <div className="header__left">
                    <div style={{marginRight: '20px'}}> 
                        <BurgerIcon />
                        <Logo />
                    </div>
                    <Search width={{flex: '1 1 auto'}} />
                </div>
                <div className="header__right">
                    
                </div>
            </div>
        </div>
    );
};

export default Header;