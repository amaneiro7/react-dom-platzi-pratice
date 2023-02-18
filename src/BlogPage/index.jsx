import React, {useState} from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { blogdata } from '../useContext/blogdata'
import {useAuth} from '../useContext/auth';
import {BlogPostNew} from '../BlogPostNew';

import './BlogPage.css'

export function BlogPage() {
    const auth = useAuth();
    const navigate = useNavigate();
    const [newBlog, setNewBlog] = useState(false)

    const addNewBlog = () => {
        navigate('/blog')
        setNewBlog(true)
    }

    return (
        <section className='BlogPage'>
            <h1>BlogPage</h1>

            {(auth.user?.role === "creator") ? <button onClick={addNewBlog}>Add New Blog</button> : null}
            <ul>
                {blogdata.map(post => (
                    <BlogLink
                        key={post.id}
                        post={post} />
                ))}
            </ul>
            {newBlog && <BlogPostNew
                username={auth.user?.username}
                setNewBlog={setNewBlog}
            />}
            <Outlet />
        </section>
    )
}

function BlogLink({ post }) {
    return (
        <li>
            <h2>{post.title}</h2>     
            <p>{post.content}</p>
            <Link
                to={`/blog/${post.slug}`}
            >
                Read More
            </Link>
        </li>
        
    )
}