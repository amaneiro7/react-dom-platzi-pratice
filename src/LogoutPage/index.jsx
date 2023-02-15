import React from 'react';
import { useAuth } from '../useContext/auth';

export function LogoutPage() {
    const auth = useAuth();

    const logout = (e) => {
        e.preventDefault();
        auth.logout();
    }

    return (
        (
            <div className='LoginPage'>
                <h1>Logout</h1>
                <form onSubmit={logout} className='LoginPage__form'>
                    <label>¿Quieres Salir?</label>

                    <button type='submit'>Sign Out</button>
                    </form>
            </div>
        )
    )
}
