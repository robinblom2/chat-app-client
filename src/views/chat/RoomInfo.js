import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import roominfo from "./roominfo.css";

const RoomInfo = ({ socket, username, room, setRoom }) => {
  const [roomUsers, setRoomUsers] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    socket.on("chatroom_users", (data) => {
      setRoomUsers(data);
    });

    return () => socket.off("chatroom_users");
  }, [socket]);

  const leaveRoom = () => {
    const __createdtime__ = Date.now();
    let chosenRoom = room;
    setRoom('')
    socket.emit("leave_room", { username, chosenRoom, __createdtime__ });
    navigate("/home", { replace: true });
  };

  return (
    <div className="roominfo-container">
      <div className="roominfo-left-box">
        <h2 className="roominfo-title">{room}</h2>
          <div>
            {roomUsers.length > 0 && <h5 className="roominfo-users-title">Users :</h5>}
            <ul className="roominfo-users-list">
              {roomUsers.map((user) => (
                <li
                  style={{
                    fontWeight: `${user.username === username ? "bold" : "normal"}`,
                  }}
                  key={user.id}
                >
                  {user.username}
                </li>
              ))}
            </ul>
          </div>
        <button className="roominfo-leave-button" onClick={leaveRoom}>
          Leave Room
        </button>
        </div>
    </div>
  );
};

export default RoomInfo;
