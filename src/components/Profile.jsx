import React, { useState, useRef } from "react";
import { useNavigate } from "react-router";
import { List, Plus, Question, ClockCounterClockwise, EnvelopeSimple, Paperclip, User, SignOut, UserCircle, Robot } from 'phosphor-react';
import '../styles/Profile.css';
import { fecthUsername, fecthUseremail, fecthRole,fetchToken, logout } from "../utils/Auth";
import '@fortawesome/fontawesome-free/css/all.min.css';

export default function Profile() {
    const navigate = useNavigate();
    const token = fetchToken(localStorage) || fetchToken(sessionStorage);
    const username = fecthUsername();
    const userRole = fecthRole();
    const useremail = fecthUseremail();
    const [inputText, setInputText] = useState("");
    const [isLoading, setIsLoading] = useState(false); 
    const [messages, setMessages] = useState([]); 
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); 
    const fileInputRef = useRef(null);
    const [tooltipMessage, setTooltipMessage] = useState(null);

    const signOut = () => {
        console.log('checkin');
        localStorage.removeItem("token");
        logout(localStorage);
        logout(sessionStorage);
        navigate("/");
    };
    if (!token) {
        navigate('/');
        return null;
    }

    const handleInputChange = (event) => {
        setInputText(event.target.value);
    };

    const handleFileClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (!file) {
            return;
        }
    
        const validExtensions = ['.pdf', '.xlsx', '.txt', '.pptx'];
        const fileExtension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
    
        if (!validExtensions.includes(fileExtension)) {
            setTooltipMessage('Invalid file type. please upload .pdf,.xlsx,.txt,.pptx file.');
            setTimeout(() => {
                setTooltipMessage(null); 
            }, 2000);
            return;
        }
    
        console.log("Selected file:", file);
    
        const formData = new FormData();
        formData.append("file", file);
    
        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:8000/upload_file', {
                method: 'POST',
                body: formData,
            });
    
            if (!response.ok) {
                throw new Error('File upload failed');
            }
    
            const data = await response.json();
            console.log('File upload success:', data.Status);
            setTooltipMessage(data.Status); 
        } catch (error) {
            console.error('Error:', error);
            setTooltipMessage('File upload failed'); 
        } finally {
            setIsLoading(false);
            setTimeout(() => {
                setTooltipMessage(null); 
            }, 2000);
        }
    };
    
    

    const onSend = async (event) => {
        event.preventDefault();
        console.log("Text:", inputText);

        // Add the user prompt to the messages list
        setMessages(prevMessages => [...prevMessages, { user: 'user', text: inputText }]);
        setInputText(""); // Clear the input field

        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:8000/user/query', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "query": inputText }),
            });

            if (!response.ok) {
                throw new Error('Text submission failed');
            }

            const data = await response.json();
            console.log('Text submission success:', data);
            setMessages(prevMessages => [...prevMessages, { user: 'bot', text: data }]);
        } catch (error) {
            console.error('Error:', error);
            setMessages(prevMessages => [...prevMessages, { user: 'bot', text: 'Text submission failed' }]);
        } finally {
            setIsLoading(false); 
        }
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="profile-page">
            <div className="content-wrapper">
                {isLoading && (
                    <div className="spinner-overlay">
                        <i className="fas fa-spinner fa-spin fa-3x"></i>
                    </div>
                )}
                <aside className='sidebar-styled'>
                    <div className='sidebar-top'>
                        <button className='sidebar-item'><Plus weight='bold' size={20} /> New chat</button>
                    </div>
                    <div className='sidebar-bottom'>
                        <div className='sidebar-item' onClick={toggleSidebar}>
                            <User weight='bold' size={20} /> {username}
                        </div>
                        {isSidebarOpen && (
                            <div className="popup-box">
                                {/* <div className='sidebar-item'><Question weight='bold' size={20} /> Help</div>
                                <div className='sidebar-item'><ClockCounterClockwise weight='bold' size={20} /> Activity</div> */}
                                <div className='sidebar-item disabled'>
                                    <EnvelopeSimple weight='bold' size={20} className="emailIcon" /> {useremail}
                                </div>
                                <div className='sidebar-item' onClick={signOut}>
                                    <SignOut weight='bold' size={20} className="signoutIcon" /> Sign out
                                </div>
                            </div>
                        )}
                    </div>

                </aside>
                <div className="main-content">
                    <nav className="navbar-styled">
                        <p>Knowledge Base</p>
                    </nav>
                    <div className="main-content1">
                        <div className="response-container">
                            {messages.map((message, index) => (
                                <div key={index} className={`response-value ${message.user}`}>
                                    {message.user === 'user' ? (
                                        <UserCircle size={20} className="message-icon user"/>
                                    ) : (
                                        <Robot size={20} className="message-icon bot"/>
                                    )}
                                    <span>{message.text}</span>
                                </div>
                            ))}
                        </div>
                        <div className="input-container">
                            <form onSubmit={onSend} className="input-form">
                                <input
                                    type="text"
                                    placeholder="Type your message here"
                                    value={inputText}
                                    onChange={handleInputChange}
                                    className="input-field"
                                />
                                <button type="submit" className="send-button">Send</button>
                            </form>
                            {userRole === 'admin' && (
                                <Paperclip
                                    weight="bold"
                                    size={25}
                                    onClick={handleFileClick}
                                    className="paperclip-icon"
                                />
                            )}
                            <input
                                type="file"
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                                onChange={handleFileChange}
                                 accept=".pdf,.xlsx,.txt,.pptx"
                            />
                        </div>
                    </div>
                    {tooltipMessage && (
                        <div className="tooltip">
                            {tooltipMessage}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
