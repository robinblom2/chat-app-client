import { useState } from "react"
import sendMessages from "./sendMessages.css";

const SendMessage = ({ socket, username, room }) => {
    const [message, setMessage] = useState('');

    // Skickar användarens meddelande till servern
    const sendMessage = () => {
        if ( message !== '') {
            const __createdtime__ = Date.now();
            
            socket.emit('send_message', { username, room , message, __createdtime__});
            setMessage('');
        }
    };

    return (
        <div className="send-input-container">
            <div className="send-input-box">
                 <input
                    className="send-input"
                    placeholder="Type message here..."
                    onChange={(event) => setMessage(event.target.value)}
                    value={message}
                />
                <button 
                    className="send-input-button"
                    onClick={sendMessage}
                >
                    Send
                </button>
            </div>
        </div>
    )
}

export default SendMessage;
