import React, { useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from "../useContext/auth";

export function Profile() {
    const { user, userList } = useAuth();
    const auth = useAuth();
    const [editMode, setEditmode] = useState(false);
    const { username } = useParams();
    const userDB = userList.find(users => users.username === username)
    

    const canEdit = user?.username === username    
    return (
        <>
            {!editMode && <InfoMode 
                userDB={userDB}
                username={username}
                canEdit={canEdit}
                editMode={editMode}
                setEditmode={setEditmode}
            />}
            {editMode && <EditingMode 
                auth={auth}
                userDB={userDB}
                username={username}
                canEdit={canEdit}
                editMode={editMode}
                setEditmode={setEditmode}
            />}
        </>
    )
}

function InfoMode(props) {    
    const { name, lastname, email, role, imgUrl } = props.userDB
    const { username, canEdit, editMode, setEditmode} = props
    const onEdit = () => {
        setEditmode(true)
    }
    return (
        <div className='profile__card--container'>
            <div className='profile__card--name'>
                <img src={`${imgUrl}${name}+${lastname}`} alt={`${username} profile`} />
                <h2>{username}</h2>
                <p>{role}</p>
                {(canEdit && !editMode) && <button onClick={onEdit}>Editar</button>}                
            </div>
            <div className='profile__card--info'>
                <h2>Information</h2>
                <br />
                <label htmlFor="Name">Name</label>                
                <p>{name}</p>
                <label htmlFor="Last Name">Last Name</label>
                <p>{lastname}</p>
                <label htmlFor="Email Address">Email Address</label>
                <p>{email}</p>
            </div>
        </div>
    )
}

function EditingMode(props) {
    const { name, lastname, email, imgUrl } = props.userDB
    const { username, canEdit, editMode, setEditmode, auth} = props
    const formRef = useRef(null)

    const onSave = (e) => {
        e.preventDefault();
        setEditmode(false);
        const formData = new FormData(formRef.current)
        const updateUser = {
            username: username,
            name: formData.get('name'),
            lastname: formData.get('lastname'),
            role: formData.get('role')
        }
        auth.UpdatingUser({updateUser})
    }
    const onCancel = () => {
        setEditmode(false)
    }
    return (
        <form className='profile__card--container' ref={formRef}>
            <div className='profile__card--name'>
                <img src={`${imgUrl}${name}+${lastname}`} alt={`${username} profile`} />
                <h2>{username}</h2>
                <select name="role" id="role">
                    <option value="guest">Guest</option>
                    <option value="editor">Editor</option>
                    <option value="cretor">Creator</option>
                </select>            
                {(canEdit && editMode) && <button onClick={onSave}>Save</button>}                
                {(canEdit && editMode) && <button onClick={onCancel}>Cancel</button>}                
            </div>
            <div className='profile__card--info'>
                <h2>Information</h2>
                <br />


                <label htmlFor="Name">Name
                    <input type="text" name='name' defaultValue={name} />
                </label>
                <label htmlFor="Last Name">Last Name
                    <input type="text" name='lastname' defaultValue={lastname} />    
                </label>
                <label htmlFor="Email Address">Email Address
                    <p>{email}</p>
                </label>
            </div>
        </form>    
    )
}
