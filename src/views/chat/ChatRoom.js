import Messages from "./Messages";

const ChatRoom = ({ socket }) => {
  return (
    <div>
      <div>
        <Messages socket={socket} />
      </div>
    </div>
  );
};

export default ChatRoom;
