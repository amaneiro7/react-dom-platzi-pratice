import React from 'react';
import { Link, Outlet } from 'react-router-dom'
import { blogdata } from '../useContext/blogdata'
import './BlogPage.css'

export function BlogPage() {
    return (
        <section className='BlogPage'>
            <h1>BlogPage</h1>

            <ul>
                {blogdata.map(post => (
                    <BlogLink
                        key={post.id}
                        post={post} />
                ))}
            </ul>
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