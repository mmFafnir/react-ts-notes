import React, { useEffect, useRef, useState } from 'react';
import { FC } from 'react';
import { useDispatch } from 'react-redux';

import { ListStyleActionType } from '../../store/reducer/ListStyleReducer/ListStyleInterface';
import { defaultWidth } from '../../store/reducer/ListStyleReducer/reducer';

import BurgerIcon from '../UI/BurgerIcon';
import ListIcon from '../UI/ListIcon';
import Loading from '../UI/Loading';
import Logo from '../UI/Logo';
import Search from '../UI/Search';

import './header.scss'


interface IProps {
    loading: boolean;
}

const Header:FC<IProps> = ({
    loading 
}) => {

    

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
                    {
                        loading ? <Loading /> : null
                    }
                    <ListIcon />
                </div>
            </div>
        </div>
    );
};

export default React.memo(Header);