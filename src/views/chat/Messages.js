import { useEffect, useState } from "react";

const Messages = ({ socket }) => {
  const [messagesFromDB, setMessagesFromDB] = useState([]);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log(data);
      setMessagesFromDB((dbState) => [
        ...dbState,
        {
          message: data.message,
          username: data.username,
          timeStamp: data.timeStamp,
        },
      ]);
    });
    return () => socket.off("receive_message");
  }, [socket]);

  function formatTimeStamp(timeStamp) {
    const date = new Date(timeStamp);
    return date.toLocaleString();
  }

  return (
    <div className="messages-container">
      {messagesFromDB.map((message, index) => (
        <div className="message" key={index}>
        <p>{message.username}</p>
        <p>{formatTimeStamp(message.timeStamp)}</p>
        <p>{message.message}</p>
        </div>
      ))}
    </div>
  )

};

export default Messages;
