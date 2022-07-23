import React, { FC, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ListStyleActionType } from '../../../store/reducer/ListStyleReducer/ListStyleInterface';
import { defaultWidth } from '../../../store/reducer/ListStyleReducer/reducer';


import './style.scss'
const ListIcon:FC = () => {

    const dispatch = useDispatch<any>()
    
    const [horizontally, setHorizontally] = useState<boolean>(false)
    const listStyleRef = useRef<HTMLButtonElement|null>(null);

    const handlerStyleList = () => {
        dispatch({
            type: ListStyleActionType.CHANGE_WIDTH,
            payload: horizontally ? '100%' : defaultWidth
        })
    }
    

    useEffect(()=>{
        handlerStyleList()
    }, [horizontally])  
    
    useEffect(() => {
        window.addEventListener('resize', function(){
            if(!listStyleRef.current) return;
            if(window.innerWidth < 871) {
                if(listStyleRef.current.style.display !== 'none') {
                    dispatch({
                        type: ListStyleActionType.CHANGE_WIDTH,
                        payload: '100%'
                    })
                    listStyleRef.current.style.display = 'none'
                } 
            } else {   
                listStyleRef.current.style.display = 'block'
            }
        })
        if(!listStyleRef.current) return;
        if(window.innerWidth < 871) {
            if(listStyleRef.current.style.display !== 'none') {
                dispatch({
                    type: ListStyleActionType.CHANGE_WIDTH,
                    payload: '100%'
                })
                listStyleRef.current.style.display = 'none'
            } 
        } else {   
            listStyleRef.current.style.display = 'block'
        }
    }, [])
    
    return (
        <button
            ref={listStyleRef}
            onClick={() => setHorizontally(!horizontally)} 
            className='style-list'
        >
            <span></span>
            <span></span>
        </button>
    );
};

export default ListIcon;