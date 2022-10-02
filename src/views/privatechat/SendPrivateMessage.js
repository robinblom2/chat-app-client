import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

const SendPrivateMessage = ({ targetUser, currentUser, socket, room }) => {
    const [privateMessage, setPrivateMessage] = useState('');
    const [roomUsers, setRoomUsers] = useState([]);

    console.log(`Info about stuffs: ${targetUser} ${currentUser} ${socket}`);

    const navigate = useNavigate();

    const sendPrivateMessage = () => {
        if ( privateMessage !== '') {
            const __createdtime__ = Date.now();
            
            socket.emit('send_private_message', { currentUser, targetUser, privateMessage, __createdtime__});
            setPrivateMessage('');
        }
    };

    const leavePrivate = () => {
        if (room !== '' && currentUser !== '') {
          socket.emit('join_room', { room });
        }
    
        // Redirect to /chat
        navigate('/chatroom', { replace: true }); // Add this
      }

    useEffect(() => {
        socket.on('chatroom_users', (data) => {
          console.log(data);
          setRoomUsers(data);
        });
    
        return () => socket.off('chatroom_users');
      }, [socket]);

      

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

            <br />

            <button className='btn btn-outline' onClick={leavePrivate}>
                Leave
            </button>
        </div>
    )
}

export default SendPrivateMessage;
