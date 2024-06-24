import { useLocation,Navigate } from "react-router-dom"

// store items
export const setToken = (token)=>{

    localStorage.setItem('token', token)// make up your own token
}

export const setUsername = (username) => {
    localStorage.setItem('username', username)
}

export const setUseremail = (useremail) => {
    localStorage.setItem('useremail',useremail)
}
export const setRole = (role) => {
    localStorage.setItem('userrole', role)
}


// fetch items
export const fetchToken = ()=>{
    return localStorage.getItem('token')
}

export const fecthUsername = () => {
    return localStorage.getItem('username')
}

export const fecthUseremail = () => {
    return localStorage.getItem('useremail')
}

export const fecthRole = () => {
    return localStorage.getItem('userrole')
}

export function RequireToken({children}){

    let auth = fetchToken()
    let location = useLocation()

    if(!auth){

        return <Navigate to='/' state ={{from : location}}/>;
    }

    return children;
}
