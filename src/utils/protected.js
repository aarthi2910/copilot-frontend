// // import React, { useEffect } from "react";
// // import  {useNavigate} from "react-router-dom";

// // function ProtectedPage(){
// //     const navigate = useNavigate();

// //     useEffect(() => {
// //         const verifyToken = async () => {
// //             const token = localStorage.getItem('token');
// //             console.log(token);
// //             try {
// //                 const response = await fetch(`http://localhost:8080/verify-token/${token}`)

// //                 if(!response.ok){
// //                     console.log('Token verification failed')
// //                 }
// //             }catch {
// //                 localStorage.removeItem('token');
// //                 navigate('/');
// //             }
// //         };

// //         verifyToken();
// //     }, [navigate]);
// //     return(
// //         navigate('/profile')
// //     )
// // }

// // export default ProtectedPage;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ProtectedPage() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [isVerified, setIsVerified] = useState(false);

    useEffect(() => {
        const verifyToken = async () => {
            const token = localStorage.getItem('token');
            console.log(token);
            try {
                const response = await fetch(`http://localhost:8000/verify-token/${token}`);
                const data = await response.json();
                console.log(data);

                if (data) {
                    setIsVerified(true);
                    console.log("*****************************")
                    navigate('/profile');
                } else {
                    console.log("Token verification failed");
                    localStorage.removeItem('token');
                    navigate('/');
                }
            } catch (error) {
                console.error("Token verification failed:", error);
                localStorage.removeItem('token');
                navigate('/');
            } finally {
                setIsLoading(false);
            }
        };

        verifyToken();
    }, [navigate]);

    if (isLoading) {
        return(
            navigate('/profile')
        );
    }

    return null; 
}

export default ProtectedPage;
