import React from 'react';

export function InfoMode(props) {    
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