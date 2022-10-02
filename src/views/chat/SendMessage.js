import { useState } from "react"

const SendMessage = ({ socket, currentUser, room }) => {
    const [message, setMessage] = useState('');

    let username = currentUser.username

    const sendMessage = () => {
        if ( message !== '') {
            const __createdtime__ = Date.now();
            
            socket.emit('send_message', { username, room , message, __createdtime__});
            setMessage('');
        }
    };

    return (
        <div className="send-input-container">
            <input
                className="send-input"
                placeholder="type here..."
                onChange={(event) => setMessage(event.target.value)}
                value={message}
            />
            <button 
                className="send-input-button"
                onClick={sendMessage}
            >
                Send Message
            </button>
        </div>
    )
}

export default SendMessage;
