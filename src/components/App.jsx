import logo from '../assets/logo.svg';
import '../styles/App.css';
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../components/Login";
import Profile from "../components/Profile";
import { RequireToken } from "../utils/Auth";
import ProtectedPage from '../utils/protected';
import Signup from "../components/Signup";

function App() {
  return (
    <div className="App">
        <div className ="App">
        {/* <Login />  */}
        {/* <Profile />  */}
        {/* <Signup /> */}
            {/* <Router>    */}
                <Routes>
                    <Route path="/" element = {<Login/>}/>
                    <Route path="/profile"
                        element={
                            <RequireToken>
                            <Profile />
                            </RequireToken>
                        }
                        />
                    <Route path='/components/protected' element={<ProtectedPage />}/>
                    <Route path='/components/Signup' element={<Signup />}/>
                </Routes>
            {/* </Router>  */}
        </div>
    </div>
  );
}

export default App;
