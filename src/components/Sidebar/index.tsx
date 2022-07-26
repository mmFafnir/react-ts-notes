
import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useTypeSelector } from '../../hooks/useTypeSelector';
import { ILabel } from '../../store/reducer/LabelReducer/type';
import Scrollbar from '../UI/Scrollbar';


import './Sidebar.scss'

enum NavTypes {
    BUTTON = 'BUTTON',
    LINK = 'LINK'
}

interface ISidebarLink {
    title: string;
    svg: any;
    path?: string;
    active?: boolean;
    fnc?: () => void;
    type: NavTypes;
}


interface IProps {
    setModalLabel: Dispatch<SetStateAction<boolean>>;
}


const Sidebar:FC<IProps> = ({setModalLabel}) => {

    const open = useTypeSelector(state => state.sidebarOpen);

    const sidebarLinks = [
        {
            title: 'Заметки',
            active: true,
            path: '/',
            type: NavTypes.LINK,
            svg: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6A4.997 4.997 0 0 1 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z"></path></svg>,
        },
        {
            title: 'Изменение ярлыков',
            active: false,
            type: NavTypes.BUTTON,
            fnc: () => setModalLabel(prev => !prev),
            svg: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20.41 4.94l-1.35-1.35c-.78-.78-2.05-.78-2.83 0L13.4 6.41 3 16.82V21h4.18l10.46-10.46 2.77-2.77c.79-.78.79-2.05 0-2.83zm-14 14.12L5 19v-1.36l9.82-9.82 1.41 1.41-9.82 9.83z"></path></svg>
        },
        { 
            title: 'Архив',
            active: false,
            path: '/archive',
            type: NavTypes.LINK,
            svg: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20.54 5.23l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.16.55L3.46 5.23C3.17 5.57 3 6.02 3 6.5V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.48-.17-.93-.46-1.27zM6.24 5h11.52l.83 1H5.42l.82-1zM5 19V8h14v11H5zm11-5.5l-4 4-4-4 1.41-1.41L11 13.67V10h2v3.67l1.59-1.59L16 13.5z"></path></svg>
        },
        {
            title: 'Корзина',
            active: false,
            path: '/trash',
            type: NavTypes.LINK,
            svg: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M15 4V3H9v1H4v2h1v13c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V6h1V4h-5zm2 15H7V6h10v13z"></path><path d="M9 8h2v9H9zm4 0h2v9h-2z"></path></svg>
        },
    ]

    const labels = useTypeSelector(state => state.label);
    const [sidebarNav, setSidebarNav] = useState<ISidebarLink[]>(sidebarLinks)

    useEffect(() => {
        const sidebarLabels = JSON.parse(JSON.stringify(labels.data)).map((label:ILabel) => {
            return {
                path: `label/${label.title}`,
                svg: (
                    <svg className='tag' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <path d="M48 32H197.5C214.5 32 230.7 38.74 242.7 50.75L418.7 226.7C443.7 251.7 443.7 292.3 418.7 317.3L285.3 450.7C260.3 475.7 219.7 475.7 194.7 450.7L18.75 274.7C6.743 262.7 0 246.5 0 229.5V80C0 53.49 21.49 32 48 32L48 32zM112 176C129.7 176 144 161.7 144 144C144 126.3 129.7 112 112 112C94.33 112 80 126.3 80 144C80 161.7 94.33 176 112 176z"/>
                    </svg>
                ),
                type: NavTypes.LINK,
                title: label.title

            }
        })

        sidebarLinks.splice(2, 0, ...sidebarLabels)
        setSidebarNav(sidebarLinks) 
    }, [labels])
    
    return (
        <div className={`sidebar ${open ? 'open' : ''}`}> 
            <div className="sidebar__wrapper">
                    <nav className='sidebar__nav'>
                        <Scrollbar maxHeight={'90vh'} >
                        { 
                            sidebarNav.map(link => {
                                if(link.type === NavTypes.BUTTON) {
                                    return (
                                        <span
                                            key={link.title}
                                            onClick={link.fnc}
                                            className='sidebar__link'
                                        >
                                            {link.svg}
                                            <span>{link.title}</span>
                                        </span>
                                    )
                                } else if(link.type === NavTypes.LINK) {
                                    return (
                                        <NavLink 
                                            key={link.title}
                                            to={link.path ? link.path : '/'}
                                            // onClick={() => changeActiveLink(link.title)}
                                            
                                            className={({ isActive }) => isActive ? "sidebar__link active-link" : "sidebar__link"} >
                                                {link.svg}
                                                <span>{link.title}</span>
                                        </NavLink>  

                                    )

                                }
                            })
                        }
                        </Scrollbar>
                    </nav>

            </div>
        </div>
    );
};

export default React.memo(Sidebar);