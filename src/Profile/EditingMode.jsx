import React, {useRef} from "react"

export function EditingMode(props) {
    const { name, lastname, role, email, imgUrl } = props.userDB
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
                <select name="role" id="role" defaultValue={role}>
                    <option value={"guest"}>Guest</option>
                    <option value={"editor"}>Editor</option>
                    <option value={"creator"}>Creator</option>
                </select>
                <div>
                    {(canEdit && editMode) && <button onClick={onSave}>Save</button>}
                    {(canEdit && editMode) && <button onClick={onCancel}>Cancel</button>}                
                </div>    
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
