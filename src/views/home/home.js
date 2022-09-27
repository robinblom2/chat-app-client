import { useNavigate } from "react-router-dom";


const Home = ({ username, setUsername, room, setRoom, socket }) => {
  const navigate = useNavigate();
  const options = [
    {
      value: "default",
      label: "Please choose an option",
    },
    {
      value: "room1",
      label: "Room 1",
    },
    {
      value: "room2",
      label: "Room 2",
    },
    {
      value: "room3",
      label: "Room 3",
    },
  ];

  const joinRoom = () => {
    if (room !== "" && username !== "") {
      socket.emit("join_room", { username, room });
    }
    navigate("/chatroom", { replace: true });
  };

  return (
    <div>
      <div>
        <input
          placeholder="Username..."
          onChange={(event) => setUsername(event.target.value)}
        />
      <select onChange={(event) => setRoom(event.target.value)}>
        <option value='default'>Please choose an option below...</option>
        <option value='room1'>Room 1</option>
        <option value='room2'>Room 2</option>
        <option value='room3'>Room 3</option>
      </select>
        <button onClick={joinRoom}>Join Room</button>
      </div>
    </div>
  );
};

export default Home;
