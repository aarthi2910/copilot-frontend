import logo from './logo.svg';
import './App.css';
import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Profile from "./Profile";
import { RequireToken } from "./Auth";

function App() {
  return (
    <div className="App">
        <div className ="App">
        <Login /> 
        {/* <Profile />      */}
            {/* <Routes>
                <Route path="/" element = {<Login/>}/>
                <Route path="/profile"
                    element={
                        <RequireToken>
                        <Profile />
                        </RequireToken>
                    }
                    />
            </Routes> */}
        </div>
    </div>
  );
}

export default App;
