import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from "../useContext/auth";
import { InfoMode } from "./InfoMode";
import { EditingMode } from "./EditingMode";

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