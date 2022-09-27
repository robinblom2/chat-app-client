import Messages from "./Messages";
import RoomInfo from "./RoomInfo";
import SendMessage from "./SendMessage";

const ChatRoom = ({ socket, username, room }) => {
  return (
    <div>
      <RoomInfo socket={socket} username={username} room={room}/>
      <div>
        <Messages socket={socket}/>
        <SendMessage socket={socket} username={username} room={room}/>
      </div>
    </div>
  );
};

export default ChatRoom;
