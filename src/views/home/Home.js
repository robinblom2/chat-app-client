import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import home from "./home.css"


const Home = ({ username, room, setRoom, socket }) => {
  const [allUsers, setAllUsers] = useState([]);
  
  const navigate = useNavigate();

  useEffect(() => {
    socket.on('all_users', (data) => {
      console.log(data);
      setAllUsers(data);
    })

    return () => socket.off('all_users');
  }, [socket, allUsers]);

  const joinRoom = () => {
    if (room !== "" && username !== "") {
      socket.emit("join_room", { username, room });
    }
    navigate("/chatroom", { replace: true });
  };

  const leaveServer = () => {
    socket.emit('disconnect', {username});
    navigate('/', { replace : true });
  }

  return (
    <div className="home-container">
      <div className="room-box">
        <div className="select">
          <select className="select-room-dropdown" onChange={(event) => setRoom(event.target.value)}>
            <option value='default'>Please choose an option below...</option>
            <option value='room1'>Room 1</option>
            <option value='room2'>Room 2</option>
            <option value='room3'>Room 3</option>
          </select>
        </div>
        <div>
          <button className="join-room-button" onClick={joinRoom}>Join Room</button>
        </div>
      </div>
       <button className="leave-server-button" onClick={leaveServer}>Leave Server</button>
    </div>
  );
};

export default Home;
