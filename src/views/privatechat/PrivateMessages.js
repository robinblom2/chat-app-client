import { useEffect, useRef, useState } from "react";

const PrivateMessages = ({ targetUser, currentUser, socket, room }) => {
  const [privateMessagesFromDB, setPrivateMessagesFromDB] = useState([]);

  console.log(`Info about stuffs: ${targetUser} ${currentUser} ${socket}`);

  /*const messagesContainerRef = useRef(null);*/
  
  /*const {state} = useLocation();
  console.log(state);*/

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
      setPrivateMessagesFromDB((dbState) => [
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
    socket.on('last_20_private_messages', (last20PrivateMessages) => {
      last20PrivateMessages = JSON.parse(last20PrivateMessages);
      console.log(last20PrivateMessages);
      last20PrivateMessages = sortMessages(last20PrivateMessages);
      setPrivateMessagesFromDB((dbState) => [...last20PrivateMessages, ...dbState]);
    });

    return () => socket.off('last_20_private_messages')
  }, [socket]);

  /*useEffect(() => {
    messagesContainerRef.current.scrollTop = 
    messagesContainerRef.current.scrollHeight;
  }, [privateMessagesFromDB]);*/


  function sortMessages(privateMessagesFromDB) {
    return privateMessagesFromDB.sort( (a,b) => parseInt(a.__createdtime__) - parseInt(b.__createdtime__));
  }

  function formatTimeStamp(timeStamp) {
    console.log(timeStamp)
    const date = new Date(timeStamp);
    console.log(date)
    return date.toLocaleString();
  }

  

  return (
    <div className="private-messages-container">
      <h1>{targetUser}</h1>
      <p>{currentUser}</p>

      {privateMessagesFromDB.map((message, index) => (
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