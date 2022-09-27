import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

const RoomInfo = ( { socket, username, room } ) => {
    const [roomUsers, setRoomUsers] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        socket.on('chatroom_users', (data) => {
            setRoomUsers(data);
        });

        return () => socket.off('chatroom_users');
    }, [socket]);

    const leaveRoom = () => {
        const timeStamp = Date.now();
        socket.emit('leave_room', { username, room, timeStamp});
        navigate('/', {replace: true });
    }

    return (
        <div>
            <h2 className="chatroom-title">{room}</h2>
            <div>
             {roomUsers.length > 0 && <h5 className='users-title'>Users :</h5>}
                <ul className="users-list">
                    {roomUsers.map((user) => (
                        <li style={{
                            fontWeight: `${user.username === username ? 'bold' : 'normal'}`,
                        }}key={user.id}>{user.username}</li>
                    ))}
                </ul>
            </div>
            <button className='roominfo-leave-button' onClick={leaveRoom}>Leave Room</button>
        </div>
       
    )
}

export default RoomInfo;