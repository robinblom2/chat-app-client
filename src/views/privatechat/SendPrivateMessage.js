import { useState } from "react"

const SendPrivateMessage = ({ targetUser, currentUser, socket }) => {
    const [privateMessage, setPrivateMessage] = useState('');

    const sendPrivateMessage = () => {
        if ( privateMessage !== '') {
            const __createdtime__ = Date.now();
            
            socket.emit('send_private_message', { currentUser, targetUser, privateMessage, __createdtime__});
            setPrivateMessage('');
        }
    };

    return (
        <div className="send-input-container">
            <input
                className="send-input"
                placeholder="type here..."
                onChange={(event) => setPrivateMessage(event.target.value)}
                value={privateMessage}
            />
            <button 
                className="send-input-button"
                onClick={sendPrivateMessage}
            >
                Send Message
            </button>
        </div>
    )
}

export default SendPrivateMessage;
