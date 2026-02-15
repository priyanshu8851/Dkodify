import React from 'react'
import "../CodeEditor/CodeEditor.css"
import { FaLocationArrow } from "react-icons/fa";

const Chatbox = ({response,loading,question,setQuestion}) => {
    const handleChange= (value) =>{
        setQuestion(value);
        console.log(question)
    }
    return (
        <>
            <div className="chatbox">
                <div className="chat-area">
                
                        {loading ? "Loading......." : response}
                    
                </div>
                <div className="chat-inp">
                    <input type="text" placeholder='Enter your doubt' onChange={handleChange} />
                    <button className='chat-inp-btn'><FaLocationArrow /></button>
                </div>
            </div>
        </>
    )
}

export default Chatbox
