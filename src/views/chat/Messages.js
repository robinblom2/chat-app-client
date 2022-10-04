import { useEffect, useRef, useState } from "react";
import messages from './messages.css';

const Messages = ({ socket }) => {
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

  //TODO: ändra färg på den användare som är inloggad

  return (
    <div className="messages-container" ref={messagesContainerRef}>
      {messagesFromDB.map((message, index) => (
        <div className="message" key={index}>
          <div className="message-header">
            <p>{message.username}</p>
            <p>{formatTimeStamp(message.__createdtime__)}</p>
          </div>
          <div className="message-body">
            <p>{message.message}</p>
          </div>        
        
        </div>
      ))}
    </div>
  )

};

export default Messages;
