import PrivateMessages from "./PrivateMessages";
import SendPrivateMessage from "./SendPrivateMessage";
import "./privatechat.css"

const PrivateChat = ({ targetUser, currentUser, socket, room }) => {
  return (
      <div>
        <PrivateMessages targetUser={targetUser} currentUser={currentUser} socket={socket} room={room}/>
        <SendPrivateMessage targetUser={targetUser} currentUser={currentUser} socket={socket} room={room}/>
      </div>
  );
};

export default PrivateChat;