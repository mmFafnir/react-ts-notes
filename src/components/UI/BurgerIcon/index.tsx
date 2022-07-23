import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { SidebarActionTypes } from '../../../store/reducer/SidebarReducer/reducer';
import './style.scss';


const BurgerIcon:FC = () => {

    const dispatch = useDispatch<any>()
    const handlerOpenSidebar = () => {
        dispatch({
            type: SidebarActionTypes.TOGGLE_OPEN,
        })
    } 

    return (
        <button onClick={handlerOpenSidebar} className='burger-icon'>
            <svg focusable="false" viewBox="0 0 24 24"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path></svg>
        </button>
    );
};

export default BurgerIcon;