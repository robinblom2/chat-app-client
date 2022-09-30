import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


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
    <div>
      <div>
        <select onChange={(event) => setRoom(event.target.value)}>
          <option value='default'>Please choose an option below...</option>
          <option value='room1'>Room 1</option>
          <option value='room2'>Room 2</option>
          <option value='room3'>Room 3</option>
        </select>
          <button onClick={joinRoom}>Join Room</button>
          <button onClick={leaveServer}>Leave Server</button>
      </div>
    </div>
  );
};

export default Home;
