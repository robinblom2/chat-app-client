import { useEffect, useRef, useState } from "react";
import messages from './messages.css';

const Messages = ({ socket, username }) => {
  const [messagesFromDB, setMessagesFromDB] = useState([]);

  const messagesContainerRef = useRef(null);

  // När server får in ett nytt meddelande skickas en uppdaterad lista med det nya meddelandet ut till de anslutna klienterna
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

  // Hämtar de senaste 20 meddelanderna ifrån servern
  useEffect(() => {
    socket.on('last_20_messages', (last20messages) => {
      last20messages = JSON.parse(last20messages);
      console.log(last20messages);
      last20messages = sortMessages(last20messages);
      setMessagesFromDB((dbState) => [...last20messages, ...dbState]);
    });

    return () => socket.off('last_20_messages')
  }, [socket]);

  // Scrollar vyn till att visa det senaste meddelandet
  useEffect(() => {
    messagesContainerRef.current?.scrollIntoView({behavior: "smooth"});
  }, [messagesFromDB]);

  // Sorterar meddelanden med deras timestamp så att de listas i kronologisk ordning
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
    <div className="messages-container">
      <div className="messages-area">
      {messagesFromDB.map((message, index) => (
        
        <div className={message.username === username ? "message-user" : "message"} key={index}>
          <div className="message-header">
            <img src={`https://avatars.dicebear.com/api/bottts/${message.username}.svg`} alt='Dicebear Avatar' />
            <p>{message.username}</p>
            <p>{formatTimeStamp(message.__createdtime__)}</p>
          </div>
          <div className="message-body">
            <p>{message.message}</p>
          </div>        
        
        </div>
      ))}

      </div>
      <div ref={messagesContainerRef} />   
    </div>
  )

};

export default Messages;
