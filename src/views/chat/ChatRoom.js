import Messages from "./Messages";
import RoomInfo from "./RoomInfo";
import SendMessage from "./SendMessage";
import "./chat.css"

const ChatRoom = ({ socket, currentUser, room }) => {
  return (
    <div>
      <RoomInfo socket={socket} currentUser={currentUser} room={room}/>
      <div>
        <Messages socket={socket} currentUser={currentUser} room={room}/>
        <SendMessage socket={socket} currentUser={currentUser} room={room}/>
      </div>
    </div>
  );
};

export default ChatRoom;
