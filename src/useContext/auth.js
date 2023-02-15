import React, { createContext, useContext, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import {routes} from './routes';

const AuthContext = createContext();

const userDefaultList = [
    {
        username: "admin",
        name: "admin",
        lastname: "admin",
        email: "admin@email.com",
        password: "admin123",
        imgUrl: "https://ui-avatars.com/api/?name=",
        role: "admin"
    },
    {
        username: "juandc",
        name: "Juan",
        lastname: "Castro",
        email: "juandc@email.com",
        password: "admin123",
        imgUrl: "https://ui-avatars.com/api/?name=",
        role: "editor"
    },
    {
        username: "nicobytes",
        name: "Nicolas",
        lastname: "Medina",
        email: "nicobytes@email.com",
        password: "admin123",
        imgUrl: "https://ui-avatars.com/api/?name=",
        role: "editor"
    },
    {
        username: "diannerd",
        name: "Diana",
        lastname: "Nerd",
        email: "diannerd@email.com",
        password: "admin123",
        imgUrl: "https://ui-avatars.com/api/?name=",
        role: "editor"
    },
]

function AuthProvider({ children }) {
    const navigate = useNavigate();
    const [userList, setUserList] = useState(userDefaultList)
    const [user, setUser] = useState(null);
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    
    const login = ({userData}) => {        
        const validateUser = userList.find(users => users.username === userData.username.toLowerCase());
        
        if (!validateUser) {
            setUser(null)
            setError(true)
            setErrorMsg("User does not exist");
            return
        } else if (validateUser.password !== userData.password) {
            setUser(null)
            setError(true)
            setErrorMsg("Invalid Password");
            return
        } else {
            setUser(validateUser)
            setError(null)
            setErrorMsg("")
            routes[2].to = `/profile/${userData.username}`;    
            return        
        } 
    }

    const registerNewUser = ({newUser}) => {              
        const user = userList.find(users => users.username === newUser.username.toLowerCase());
        const email = userList.find(users => users.email === newUser.email.toLowerCase());

        if (user || email) {
            setUser(null);
            setError(true);
            setErrorMsg("Username or Email is already registered");
        } else {
            const newUserList = [...userList];
            newUser.role= "guest"
            newUser.imgUrl= "https://ui-avatars.com/api/?name="
            newUserList.push(newUser);

            setUserList(newUserList)            
            setUser(newUser)
            setError(null);
            setErrorMsg("");
            routes[2].to = `/profile/${newUser.username}`;   
            
        }
    }

    const UpdatingUser = ({updateUser}) => {        
        const userIndex = userList.findIndex(users => users.username === updateUser.username.toLowerCase());
        const newUserList = [...userList]
        newUserList[userIndex].name = updateUser.name
        newUserList[userIndex].lastname = updateUser.lastname
        newUserList[userIndex].role = updateUser.role
        setUserList(newUserList)
    }   
    
    const logout = () => {
        setUser(null)
        navigate('/')
    }
    const auth = { user, error, errorMsg, login, logout, registerNewUser, UpdatingUser, userList };
    
    
    return(
        <AuthContext.Provider value={auth}>
            {children}
        </AuthContext.Provider>
    );
};

function useAuth() {
    const auth = useContext(AuthContext)
    return auth;
}

function AuthRoute({children}) {
    const auth = useAuth();
    const location = useLocation();

    if (!auth.user) {
        return <Navigate to="/login" state={{from: location}} replace />
    }
    
    return children;
}

export {
    AuthProvider,
    useAuth,
    AuthRoute,    
};