import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

const PrivateMessages = ({ socket }) => {
  const [privateMsgsFromDB, setPrivateMsgsFromDB] = useState([]);
  
  const {state} = useLocation();
  console.log(state);

  // TODO: kolla backend så detta är samma för
  // genrell och privat chatt.

  // TODO: nästa steg är att sätta ihop det privata chattrummet
  // Vi behöver antingen en extra RoomInfo, eller göra 
  // RoomInfo dynamisk så den anpassar sig efter vilken
  // typ av chatt som används.

  // TODO: Databas - ny struktur med tabeller för privata meddelanden.

  // TODO: Se över koden och strukturera samt kommentera.
  
  useEffect(() => {
    socket.on("receive_private_message", (data) => {
      console.log(data);
      setPrivateMsgsFromDB((dbState) => [
        ...dbState,
        {
          message: data.message,
          username: data.username,
          __createdtime__: data.__createdtime__,
        },
      ]);
    });
    return () => socket.off("receive_private_message");
  }, [socket]);

  useEffect(() => {
    socket.on('last_20_private_messages', (last20messages) => {
      last20messages = JSON.parse(last20messages);
      console.log(last20messages);
      last20messages = sortMessages(last20messages);
      setPrivateMsgsFromDB((dbState) => [...last20messages, ...dbState]);
    });

    return () => socket.off('last_20_private_messages')
  }, [socket]);

  function formatTimeStamp(timeStamp) {
    console.log(timeStamp)
    const date = new Date(timeStamp);
    console.log(date)
    return date.toLocaleString();
  }

  function sortMessages(messageArray) {
    return messageArray.sort( (a,b) => parseInt(a.__createdtime__) - parseInt(b.__createdtime__));
  }

  

  return (
    <div className="private-messages-container">
      <h1>{state.targetUser.username}</h1>
      <p>{state.currentUser[0].username}</p>

      {privateMsgsFromDB.map((message, index) => (
        <div className="message" key={index}>
        <p>{message.username}</p>
        <p>{formatTimeStamp(message.__createdtime__)}</p>
        <p>{message.message}</p>
        </div>
      ))}

    </div>
  )

};

export default PrivateMessages;