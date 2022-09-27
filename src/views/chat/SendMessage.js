import { useState } from "react"

const SendMessage = ({ socket, username, room }) => {
    const [message, setMessage] = useState('');

    const sendMessage = () => {
        if ( message !== '') {
            const timeStamp = Date.now();
            socket.emit('send_message', { username, room , message, timeStamp});
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
