import React, {useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import { blogdata } from '../useContext/blogdata';
import './BlogPostNew.css'

export function BlogPostNew({username, setNewBlog}) {
    const formRef = useRef(null)
    const titleRef = useRef()
    const navigate = useNavigate()

    const addingNewBlog = (e) => {
        e.preventDefault();
        const formData = new FormData(formRef.current)        
        const slug = titleRef.current.value.replace(/[^a-zA-Z0-9]/g, "-")
        console.log(slug);
        
        const newBlog = {
            id: blogdata.length+1,
            title: formData.get('title'),
            slug: slug,
            content: formData.get('content'),
            fullContent: formData.get('fullContent'),
            author: username
        }
        blogdata.push(newBlog)
        setNewBlog(false)
        navigate(`/blog/${slug}`)
    }



    return (
        <section className='BlogPostNew' onSubmit={addingNewBlog}>
            <form action={""} ref={formRef}>
                    
                <label htmlFor="title">Title</label>
                <input type="text" name='title' required ref={titleRef}/>

                <label htmlFor="content">content</label>
                <input type="text" name='content' required/>

                <label htmlFor="fullContent">fullContent</label>
                <input type="text" name='fullContent' required/>
                
                <button type={'submit'}>Save</button> 
            </form> 
        </section>
    )
}
