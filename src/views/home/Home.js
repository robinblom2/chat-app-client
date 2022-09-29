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

  const handlePrivateChat = () => {
    /* 
      tar in två användarnamn, sortera dessa efter alfabetisk ordning
      skapa sen ett rum med det namnet.
      hur gör vi så att den andra användaren blir kontaktad privat.
      hur ansluter den andra användaren till det här rummet. 
      när användare1 initsierar chatt får användare2 en stjärna jämte användare1's namn
      användare2 kan då klicka på användare1's namn och hamna i samma rum som honom.
    */
  }

  return (
    <div>
      <div>
        <div>
          {allUsers.length > 0 && <h5 className='all-users-title'>Users connected to server: </h5>}
            <ul className='all-users-list'>
              {allUsers.map((user) => (
                <li style={{
                  fontWeight: `${user.username === username ? 'bold' : 'normal'}`,
                }} key={user.id} onClick={handlePrivateChat}>{user.username.username}</li>
              ))}
            </ul>
        </div>
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
