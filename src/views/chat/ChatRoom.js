import Messages from "./Messages";
import RoomInfo from "./RoomInfo";
import SendMessage from "./SendMessage";
import chatroom from './chatroom.css'

const ChatRoom = ({ socket, username, room }) => {
  return (
    <div className="main-cr-container">
      <div className="roominfo-cr-container">
      <RoomInfo socket={socket} username={username} room={room}/>
      </div>
      <div className="messages-cr-container">
        <Messages socket={socket} username={username}/>
        <SendMessage socket={socket} username={username} room={room}/>
      </div>
    </div>
  );
};

export default ChatRoom;
