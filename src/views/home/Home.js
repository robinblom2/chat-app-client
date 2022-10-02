import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./home.css"


const Home = ({ username, room, setRoom, socket, currentUser, setCurrentUser }) => {
  const [allUsers, setAllUsers] = useState([]);
  
  const navigate = useNavigate();

  console.log(JSON.stringify(currentUser));

  useEffect(() => {
    socket.on('all_users', (data) => {
      /*console.log(data);*/
      setAllUsers(data);
    })

    return () => socket.off('all_users');
  }, [socket, allUsers]);

  useEffect(() => {
    socket.on('all_users', (data) => {
      data.filter(user => {
        if(user.username === username) {
          console.log("Current User: " + JSON.stringify(user));
          setCurrentUser(user)
        }
      }) 
    })

    return () => socket.off('all_users');
  }, [socket, allUsers])

  const joinRoom = () => {
    if (room !== "" && username !== "") {
      console.log(currentUser);
      socket.emit("join_room", { currentUser, room });
    }
    console.log(currentUser);
    navigate("/chatroom", { replace: true });
  };

  const leaveServer = () => {
    socket.emit('disconnect', { username });
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
