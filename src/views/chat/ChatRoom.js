import Messages from "./Messages";
import RoomInfo from "./RoomInfo";
import SendMessage from "./SendMessage";
import chatroom from './chatroom.css'
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

// Chatroom

const ChatRoom = ({ socket, username, room, setRoom }) => {

  const navigate = useNavigate();

  // En redirect ifall en refresh sker eftersom session-state töms (annars får användaren tillbaka en tomt chatrum)
  useEffect(() => {
    if(username === '') {
      navigate('/', { replace : true })
    }
  }, [navigate, username]);
  

  return (
    <div className="main-cr-container">
      <div className="roominfo-cr-container">
      <RoomInfo socket={socket} username={username} room={room} setRoom={setRoom}/>
      </div>
      <div className="messages-cr-container">
        <Messages socket={socket} username={username}/>
        <SendMessage socket={socket} username={username} room={room}/>
      </div>
    </div>
  );
};

export default ChatRoom;
