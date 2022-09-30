import PrivateMessages from "./PrivateMessages";
import SendPrivateMessage from "./SendPrivateMessage";

const PrivateChat = ({ targetUser, currentUser, socket }) => {
  return (
      <div>
        <PrivateMessages targetUser={targetUser} currentUser={currentUser} socket={socket}/>
        <SendPrivateMessage targetUser={targetUser} currentUser={currentUser} socket={socket}/>
      </div>
  );
};

export default PrivateChat;