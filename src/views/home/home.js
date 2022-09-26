import { useNavigate } from "react-router-dom";
import Select from "react-select";

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
        <Select
          options={options}
          defaultValue={options[0]}
          onChange={(event) => setRoom(event.target.value)}
        />
        <button onClick={joinRoom}>Join Room</button>
      </div>
    </div>
  );
};

export default Home;
