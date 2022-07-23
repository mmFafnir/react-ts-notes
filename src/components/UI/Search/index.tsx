import React, { ChangeEvent, FC, useRef, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

import './style.scss'

interface ISearchProps {
    width?: {}
}


const Search: FC<ISearchProps> = ({
    width = {width: '100%'}
}) => {

    const [value, setValue] = useState<string|undefined>('');
    
    const navigate = useNavigate();
    const location = useLocation();

    const changeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
            if(e.target.value.length == 0){
            navigate('/')
        }
        if(e.target.value !== '') {navigate({pathname:'/search', search: `?=${e.target.value}`})}
    }
    const clearInput = ():void => {
        
        setValue('');
        navigate(location.pathname);
    }
    

    return (
        <div style={width} className='search'>
            <div className="search__wrapper">
                <div className="search__icon">
                    <svg focusable="false" height="24px" viewBox="0 0 24 24" width="24px" xmlns="http://www.w3.org/2000/svg"><path d="M20.49,19l-5.73-5.73C15.53,12.2,16,10.91,16,9.5C16,5.91,13.09,3,9.5,3S3,5.91,3,9.5C3,13.09,5.91,16,9.5,16 c1.41,0,2.7-0.47,3.77-1.24L19,20.49L20.49,19z M5,9.5C5,7.01,7.01,5,9.5,5S14,7.01,14,9.5S11.99,14,9.5,14S5,11.99,5,9.5z"></path><path d="M0,0h24v24H0V0z" fill="none"></path></svg>
                </div>
                <form action="/">
                    <input 
                        type="text" 
                        value={value}
                        onChange={(e) => changeHandler(e)}
                        placeholder='Поиск'/>
                </form>
                <div onClick={() => clearInput()} className="search__close">
                    <svg focusable="false" height="24px" viewBox="0 0 24 24" width="24px" xmlns="http://www.w3.org/2000/svg"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path><path d="M0 0h24v24H0z" fill="none"></path></svg>
                </div>
            </div>
        </div>
    );
};

export default React.memo(Search);