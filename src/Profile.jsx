import React, { useState, useRef } from "react";
import { useNavigate } from "react-router";
import { List, Plus, Question, ClockCounterClockwise, Gear, Paperclip, User } from 'phosphor-react';
import './Profile.css';

export default function Profile() {
    const navigate = useNavigate();
    const [inputText, setInputText] = useState("");
    const [isLoading, setIsLoading] = useState(false); // State to track loading
    const [responseStatus, setResponseStatus] = useState(""); // State to store response status
    const fileInputRef = useRef(null);

    const signOut = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    const handleInputChange = (event) => {
        setInputText(event.target.value);
    };

    const handleFileClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
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
            setResponseStatus(data.Status); // Set the response status
            alert(data.Status);
        } catch (error) {
            console.error('Error:', error);
            alert(error);
            setResponseStatus('File upload failed'); // Set the error status
        } finally {
            setIsLoading(false); // Hide loading indicator
        }
    };

    const onSend = async (event) => {
        event.preventDefault();
        console.log("Text:", inputText);

        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:8000/upload_file', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ inputText }),
            });

            if (!response.ok) {
                throw new Error('Text submission failed');
            }

            const data = await response.json();
            console.log('Text submission success:', data);
            setResponseStatus(data.Status); // Set the response status
        } catch (error) {
            console.error('Error:', error);
            setResponseStatus('Text submission failed'); // Set the error status
        } finally {
            setIsLoading(false); 
        }
    };

    return (
        <div className="profile-page">
            <div className="content-wrapper">
                <aside className='sidebar-styled'>
                    <div className='sidebar-top'>
                        <div>
                            <List weight='bold' size={20} />
                        </div>
                        <button  className='sidebar-item'><Plus weight='bold' size={20} /> New chat</button>
                    </div>
                    <div className='sidebar-bottom'>
                        <div className='sidebar-item'><Question weight='bold' size={20} /> Help</div>
                        <div className='sidebar-item'><ClockCounterClockwise weight='bold' size={20} /> Activity</div>
                        <div className='sidebar-item'><Gear weight='bold' size={20} /> Settings</div>
                        <div className='sidebar-item'><User weight='bold' size={20} /> Admin</div> {/* Added User Icon */}
                    </div>
                </aside>
                <div className="main-content">
                    <nav className="navbar-styled">
                        <p>Knowledge Base</p>
                        <button onClick={signOut} className="signout-button">Sign out</button>
                    </nav>
                    {isLoading && (
                        <div className="spinner-overlay">
                            <img src="/spinner.png" alt="Loading..." />
                        </div>
                    )}
                    <div className="main-content1">
                        <div className="response-container">
                            <p className="response-value">{responseStatus}</p>
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
                            <Paperclip
                                weight="bold"
                                size={25}
                                onClick={handleFileClick}
                                className="paperclip-icon"
                            />
                            <input
                                type="file"
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                                onChange={handleFileChange}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
