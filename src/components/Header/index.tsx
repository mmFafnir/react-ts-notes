import React from 'react';
import { FC } from 'react';
import BurgerIcon from '../UI/BurgerIcon';
import Loading from '../UI/Loading';
import Logo from '../UI/Logo';
import Search from '../UI/Search';
import './header.scss'


interface IProps {
    handlerOpenSidebar: () => void;
    loading: boolean;
}

const Header:FC<IProps> = ({
    handlerOpenSidebar,loading 
}) => {

    return (    
        <div className='header'>
            <div className="header__wrapper">
                <div className="header__left">
                    <div style={{marginRight: '20px'}}> 
                        <BurgerIcon onClick={handlerOpenSidebar}/>
                        <Logo />
                    </div>
                    <Search width={{flex: '1 1 auto'}} />
                </div>
                <div className="header__right">
                    {
                        loading ? <Loading /> : null
                    }
                </div>
            </div>
        </div>
    );
};

export default Header;