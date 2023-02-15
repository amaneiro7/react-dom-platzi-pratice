import React, { useRef } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../useContext/auth';
import './RegisterPage.css'

export function RegisterPage() {
    const auth  = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const formRef = useRef(null)

    const from = location.state?.from?.pathname || "/"

    const register = (e) => {
        e.preventDefault();
        const formData = new FormData(formRef.current)
        const newUser = {
            username: formData.get('username'),
            name: formData.get('name'),
            lastname: formData.get('lastname'),
            email: formData.get('email'),
            password: formData.get('password')
        }
            auth.registerNewUser({newUser})
        if (!auth.error || auth.error === null) {            
            navigate(from, {replace: true});
        } 
    }

    if (auth.user) {
        return <Navigate to={`/profile/${auth.user.username}`}/>
    }

    return (
        <div className='RegisterPage'>
            <h1>Register</h1>
            <br />
            <form ref={formRef} className={`RegisterPage__form ${auth.error && "error"}`}>
                <div>
                    <label htmlFor="username">Username</label>
                    <input type="text" name='username'  required/>
                </div>
                <div className='RegisterPage__DoubeDiv'>
                    <div>
                        <label htmlFor="name">First Name</label>
                        <input type="text" name='name'  required/>
                    </div>
                    <div>
                        <label htmlFor="lastname">Last Name</label>
                        <input type="text" name='lastname'  required/>
                    </div>
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="text" name='email'  required/>
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input type="password" name='password' required/>
                </div>
                {auth.error && <p>{auth.errorMsg}</p>}
                <button type='button' onClick={register}>Submit</button>
            </form>
        </div>
    )
}
