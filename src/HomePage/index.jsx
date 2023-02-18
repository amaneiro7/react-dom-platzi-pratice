import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css'

export function HomePage() {
    return (
        <div className='HomePage'>
            <h1>HomePage</h1>
            <h2>PlatziBlog</h2>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aperiam, culpa tenetur ex molestiae perspiciatis eaque.</p>
            <Link
                to={'/blog'}
            >
                Blog
            </Link>
        </div>
    )
}
