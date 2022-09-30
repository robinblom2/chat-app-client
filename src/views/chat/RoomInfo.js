import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const RoomInfo = ({ socket, username, room }) => {
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
    socket.emit("leave_room", { username, room, __createdtime__ });
    navigate("/", { replace: true });
  };

  const joinPrivate = (targetUser, username) => {
    roomUsers.filter((user) => {
      if (user.username === username) {
        if (targetUser.id !== user.id) {
          socket.emit("join_private", {user, targetUser} )
          navigate("/privatechat", { targetUser, user } );
        } else {
          console.log("Cant chat with yourself");
        }
      }
    });
  };

      /*  tar in två användarnamn, sortera dessa efter alfabetisk ordning
          skapa sen ett rum med det namnet.
          hur gör vi så att den andra användaren blir kontaktad privat.
          hur ansluter den andra användaren till det här rummet. 
          när användare1 initsierar chatt får användare2 en stjärna jämte användare1's namn
          användare2 kan då klicka på användare1's namn och hamna i samma rum som honom.  */

  //TODO: Kolla användarnamnet om det redan existerar vid skapandet. Så inte två personer har samma.

  return (
    <div>
      <h2 className="chatroom-title">{room}</h2>
      <div>
        {roomUsers.length > 0 && <h5 className="users-title">Users :</h5>}
        <ul className="users-list">
          {roomUsers.map((user) => (
            <li
              style={{
                fontWeight: `${user.username === username ? "bold" : "normal"}`,
              }}
              key={user.id}
              onClick={() => joinPrivate(user, username)}
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
  );
};

export default RoomInfo;
