import React, { useRef } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../useContext/auth';
import './LoginPage.css';

export function LoginPage() {    
    const auth  = useAuth();
    const navigate = useNavigate();
    const location = useLocation();   
    const formRef = useRef(null)
    
    const from = location.state?.from?.pathname || "/"

    const login = (e) => {
        e.preventDefault();
        const formData = new FormData(formRef.current);
        const userData = {
            username: formData.get('username'),
            password: formData.get('password')
        }
        auth.login({userData})

        if (!auth.error || auth.error === null) {
            console.log('no estoy aqui');
            navigate(from, {replace: true});
        } 
        
    }

    
    if (auth.user) {
        return <Navigate to={`/profile/${auth.user.username}`}/>
    }

    return (
        <div className='LoginPage'>
            <h1>Login</h1>
            <br />
            <form ref={formRef} className={`LoginPage__form ${auth.error && "error"}`} >
            <label htmlFor="username">Username</label>
                <input 
                    name={'username'}
                    placeholder={'username'}
                    type={"text"}
                    required
                    />
                <label htmlFor='password'>Password</label>
                <input
                    name={'password'}
                    placeholder={'password'}
                    type={"password"}
                    required
                />
                {auth.error && <p>{auth.errorMsg}</p>}
                <button type='button' onClick={login}>Login</button>
            </form>
        </div>
    )
}
