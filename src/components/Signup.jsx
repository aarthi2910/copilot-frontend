import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import '../styles/Signup.css';
import {  setRole, setToken, setUsername , setUseremail } from "../utils/Auth";

export default function Signup() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [tooltipMessage, setTooltipMessage] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            const response = await fetch('http://localhost:8000/user/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password }),
            });

            if (!response.ok) {
                // throw new Error('Signup failed');
                setTooltipMessage('Signup failed');
            }

            const data = await response.json();
            console.log('Signup success:', data);
            setTooltipMessage(data.Status);

            if (data['access_token']) {
                // Assuming setToken, setUsername, setUseremail, and setRole are defined somewhere in the context or props
                setToken(data['access_token']);
                setUsername(data['user_name']);
                setUseremail(data['user_email']);
                setRole(data['role']);
                navigate('../utils/protected');
            } else {
                // throw new Error('Invalid token received');
                setTooltipMessage('Invalid token received');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('Signup failed');
            setTooltipMessage('Signup failed');
            
        }finally {
            setTimeout(() => {
                setTooltipMessage(null); 
            }, 2000);
        }
    };

    return (
        <div className="signup-container">
            <h2>Sign Up</h2>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmit} className="signup-form">
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="signup-button">Sign Up</button>
            </form>
            <div className="login-redirect">
                Already have an account? <Link to="../components/login">Log in</Link>
            </div>
            {tooltipMessage && (
                <div className="tooltip">
                    {tooltipMessage}
                </div>
            )}
        </div>
    );
}
