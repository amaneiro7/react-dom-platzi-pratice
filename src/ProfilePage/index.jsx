import React from 'react';
import { Profile } from '../Profile';

import './ProfilePage.css';

export function ProfilePage() {


    return (
        <section className='profile__card'>
            <h1>Profile</h1>
            <br />
            <Profile />
        </section>
    )
}