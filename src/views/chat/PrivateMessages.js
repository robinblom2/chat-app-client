import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

const PrivateMessages = ({ socket }) => {

  const {state} = useLocation();
  console.log(state);
  function formatTimeStamp(timeStamp) {
    console.log(timeStamp)
    const date = new Date(timeStamp);
    console.log(date)
    return date.toLocaleString();
  }

  return (
    <div>
      <h1>{state.targetUser.username}</h1>
      <p>{state.currentUser[0].username}</p>

    </div>
  )

};

export default PrivateMessages;