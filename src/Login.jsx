import { useNavigate } from "react-router";
import { fetchToken, setToken } from "./Auth";
import { useState } from "react";
import './Login.css'; // Import the CSS file here

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Check to see if the fields are not empty
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
      console.log(data['access token'], "response.data.token");

      if (data['access token']) {
        setToken(data['access token']);
        navigate('/profile');
      } else {
        throw new Error('Invalid token received');
      }
    } catch (error) {
      setError('Invalid credentials');
      console.error('Error:', error);
    }
  };

  return (
    <div className="container">
      <h1>Login Page</h1>
      <div>
        {fetchToken() ? (
          <p>You are logged in</p>
        ) : (
          <div>
            {error && <p className="error">{error}</p>}
            <form onSubmit={login}>
              <label>Email</label>
              <input
                type="text"
                onChange={(e) => setEmail(e.target.value)}
              />
              <label>Password</label>
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit">Login</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
