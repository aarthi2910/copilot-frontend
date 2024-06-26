import { useNavigate, Link } from "react-router-dom";
import { fetchToken, setRole, setToken, setUsername, setUseremail } from "../utils/Auth";
import { useState } from "react";
import '../styles/Login.css';

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [tooltipMessage, setTooltipMessage] = useState(null);
    const [rememberMe, setRememberMe] = useState(false);

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
                setTooltipMessage('Network response was not ok');
                return;
            }
            const data = await response.json();
            console.log(data)
            console.log(data['access_token'], "response.data.token");
            setTooltipMessage(data['status']);

            if (data['access_token']) {
                const storage = rememberMe ? localStorage : sessionStorage;
                setToken(data['access_token'], storage);
                setUsername(data['user_name'], storage);
                setUseremail(data['user_email'], storage);
                setRole(data['role'], storage);
                navigate('/protected');
            } else {
                setTooltipMessage('Invalid token received');
            }
        } catch (error) {
            setError('Invalid credentials');
            console.error('Error:', error);
            setTooltipMessage('Invalid credentials');
        } finally {
            setTimeout(() => {
                setTooltipMessage(null); 
            }, 2000);
        }
    };

    return (
        <div className="container">
            <h1 className="h1">Login Page</h1>
            <div>
                {fetchToken() ? (
                    navigate("/protected")
                ) : (
                    <div>
                        {error && <p className="error">{error}</p>}
                        <form className="login_form" onSubmit={login}>
                            <label className="label">Email</label>
                            <input
                                className="input"
                                type="text"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <label className="label">Password</label>
                            <input
                                className="input"
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button className="button" type="submit">Login</button>
                            <label className="remember-me">
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                />
                                Remember Me
                            </label>
                        </form>
                        <div className="signup-redirect">
                            Don't have an account? <Link to="/components/signup">Sign up</Link>
                        </div>
                    </div>
                    
                )}
            </div>
            {tooltipMessage && (
                <div className="tooltip">
                    {tooltipMessage}
                </div>
            )}
        </div>
    );
}
