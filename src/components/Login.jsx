import { useNavigate } from "react-router";
import { fetchToken, setRole, setToken, setUsername , setUseremail } from "../utils/Auth";
import { useState } from "react";
import '../styles/Login.css';

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const login = async (event) => {
        event.preventDefault();
        if (email === "" || password === "") {
        setError("Email and Password cannot be empty");
        return;
        }
        try {
        const response = await fetch('http://localhost:8000/user/login', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data['access_token'], "response.data.token");

        if (data['access_token']) {
            setToken(data['access_token']);
            setUsername(data['user_name']);
            setUseremail(data['user_email']);
            setRole(data['role']);
            navigate('../components/protected');
        } else {
            throw new Error('Invalid token received');
        }
        } catch (error) {
        setError('Invalid credentials');
        console.error('Error:', error);
        }
    };

    return (
      <body class=".body">
        <div className="container">
            <h1 class="h1">Login Page</h1>
            <div>
                {fetchToken() ? (
                navigate("../components/protected")
                ) : (
                <div>
                    {error && <p className="error">{error}</p>}
                    <form class="login_form" onSubmit={login}>
                    <label class="label">Email</label>
                    <input 
                        class="input"
                        type="text"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label class="label">Password</label>
                    <input
                        class="input"
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button class="button" type="submit">Login</button>
                    </form>
                </div>
                )}
            </div>
        </div>
      </body>
    );
}
