import { useLocation,Navigate } from "react-router-dom"

// store items
export const setToken = (token, storage = sessionStorage) => {
    storage.setItem('token', token);
};

export const setUsername = (username, storage = sessionStorage) => {
    storage.setItem('username', username);
};

export const setUseremail = (useremail, storage = sessionStorage) => {
    storage.setItem('useremail', useremail);
};

export const setRole = (role, storage = sessionStorage) => {
    storage.setItem('role', role);
};
export const setLoginStatus = (status) => {
    localStorage.setItem('loginStatus', status)
}
// fetch items
export const fetchToken = (storage = sessionStorage)=>{
    return storage.getItem('token')
}

export const fecthUsername = (storage = sessionStorage) => {
    return storage.getItem('username')
}

export const fecthUseremail = (storage = sessionStorage) => {
    return storage.getItem('useremail')
}

export const fecthRole = (storage = sessionStorage) => {
    return storage.getItem('userrole')
}

export const fetchLoginStatus = () => {
    return localStorage.getItem('loginStatus')
}

export function RequireToken({children}){

    let auth = fetchToken()
    let location = useLocation()

    if(!auth){

        return <Navigate to='/' state ={{from : location}}/>;
    }

    return children;
    // const navigate = useNavigate();
    // const token = fetchToken();

    // useEffect(() => {
    //     if (!token) {
    //         navigate('/');
    //     }
    // }, [token, navigate]);

    // return token ? children : null;
}

export const logout = (storage = sessionStorage) => {
    storage.removeItem('token');
    storage.removeItem('username');
    storage.removeItem('useremail');
    storage.removeItem('role');
};

