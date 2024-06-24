import logo from '../assets/logo.svg';
import '../styles/App.css';
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../components/Login";
import Profile from "../components/Profile";
import { RequireToken } from "../utils/Auth";
// import ProtectedPage from './protected';
import Signup from "../components/Signup";

function App() {
  return (
    <div className="App">
        <div className ="App">
        {/* <Login />  */}
        <Profile /> 
        {/* <Signup /> */}
            {/* <Router>   
                <Routes>
                    <Route path="/" element = {<Login/>}/>
                    <Route path="/profile"
                        element={
                            <RequireToken>
                            <Profile />
                            </RequireToken>
                        }
                        />
                    <Route path='/protected' element={<ProtectedPage />}/>
                </Routes>
            </Router>  */}
        </div>
    </div>
  );
}

export default App;
