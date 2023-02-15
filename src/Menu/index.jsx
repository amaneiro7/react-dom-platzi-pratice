import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../useContext/auth';
import { routes } from '../useContext/routes';
import './Menu.css'



export function Menu() {
    const auth = useAuth();


    return (
        <nav className='navbar'>
            <ul>                
                {routes.map(route => {
                    if (route.auth === "private" && !auth.user) return null;
                    if (route.auth === "public" && auth.user) return null;

                    return (
                    <li key={route.id}>
                        <NavLink
                            className={({isActive}) => isActive ? "selected" : undefined}                            
                            to={route.to}
                        >
                            {route.text}
                        </NavLink>
                    </li>
                    );
                })}
            </ul>
        </nav>
    )
}
