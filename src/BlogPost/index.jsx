import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { blogdata } from '../useContext/blogdata';
import {useAuth} from '../useContext/auth';


export function BlogPost() {
    const navigate = useNavigate();
    const auth = useAuth();
    const { slug } = useParams();

    const blogpost = blogdata.find(post => post.slug === slug);

    const returnToBlog = () => {
            navigate('/blog')
        }

    return (
        <>
            <h2>{blogpost.title}</h2>
            <button        
                onClick={returnToBlog}
            >
                Volver al blog
            </button>
            <p>{blogpost.author}</p>
            <p>{blogpost.content}</p>
            {(auth.user?.role === "admin" || auth.user?.username === blogpost.author) ?
            <button>Eliminar</button> : null
            }
        </>
    )
}
