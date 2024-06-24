// import React, { useEffect } from "react";
// import  {useNavigate} from "react-router-dom";

// function ProtectedPage(){
//     const navigate = useNavigate();

//     useEffect(() => {
//         const verifyToken = async () => {
//             const token = localStorage.getItem('token');
//             console.log(token);
//             try {
//                 const response = await fetch(`http://localhost:8080/verify-token/${token}`)

//                 if(!response.ok){
//                     console.log('Token verification failed')
//                 }
//             }catch {
//                 localStorage.removeItem('token');
//                 navigate('/');
//             }
//         };

//         verifyToken();
//     }, [navigate]);
//     return(
//         navigate('/profile')
//     )
// }

// export default ProtectedPage;

import { useEffect } from "react";
import  {useNavigate} from "react-router-dom";

function ProtectedPage(){
    const navigate = useNavigate();

    useEffect(() => {
        const verifyToken = async () => {
            const token = localStorage.getItem('token');
            console.log(token);
            try {
                const response = await fetch(`http://localhost:8000/verify-token/${token}`)
                const data = await response.json();
                console.log(data)
                if(!data){
                    console.log("********************************")
                    console.log('Token verification failed')
                    localStorage.removeItem('token');
                    navigate('/');
                }else{
                    navigate('/profile')
                }
            }catch {
                localStorage.removeItem('token');
                navigate('/');
            }
        };

        verifyToken();
    }, [navigate]);
    return(
        navigate('/profile')
    )
}

export default ProtectedPage;