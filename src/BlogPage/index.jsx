import React from 'react';
import { Link, Outlet } from 'react-router-dom'
import { blogdata } from '../useContext/blogdata'

export function BlogPage() {
    return (
        <>
            <h1>BlogPage</h1>

            <ul>
                {blogdata.map(post => (
                    <BlogLink 
                    key={post.id}
                    post={post}/>
                    ))}
            </ul>
            <Outlet/>
        </>
    )
}

function BlogLink({ post }) {
    return (
        <li>
            <Link
                to={`/blog/${post.slug}`}
            >
                {post.title}
            </Link>
        </li>
    )
}