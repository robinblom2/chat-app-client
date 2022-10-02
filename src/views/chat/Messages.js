import { useEffect, useRef, useState } from "react";

const Messages = ({ socket, currentUser, room }) => {
  const [messagesFromDB, setMessagesFromDB] = useState([]);

  const messagesContainerRef = useRef(null);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log(data);
      setMessagesFromDB((dbState) => [
        ...dbState,
        {
          message: data.message,
          username: data.username,
          __createdtime__: data.__createdtime__,
        },
      ]);
    });
    return () => socket.off("receive_message");
  }, [socket]);

  useEffect(() => {
    socket.on('last_20_messages', (last20messages) => {
      last20messages = JSON.parse(last20messages);
      console.log(last20messages);
      last20messages = sortMessages(last20messages);
      setMessagesFromDB((dbState) => [...last20messages, ...dbState]);
    });

    return () => socket.off('last_20_messages')
  }, [socket]);

  useEffect(() => {
    messagesContainerRef.current.scrollTop = 
    messagesContainerRef.current.scrollHeight;
  }, [messagesFromDB]);


  function sortMessages(messagesFromDB) {
    return messagesFromDB.sort( (a,b) => parseInt(a.__createdtime__) - parseInt(b.__createdtime__));
  }

  function formatTimeStamp(timeStamp) {
    console.log(timeStamp)
    const date = new Date(timeStamp);
    console.log(date)
    return date.toLocaleString();
  }

  return (
    <div className="messages-container" ref={messagesContainerRef}>
      {messagesFromDB.map((message, index) => (
        <div className="message" key={index}>
        <p className="userName">{message.username}</p>
        <p className="date">{formatTimeStamp(message.__createdtime__)}</p>
        <p className="messageText">{message.message}</p>
        </div>
      ))}
    </div>
  )

};

export default Messages;
