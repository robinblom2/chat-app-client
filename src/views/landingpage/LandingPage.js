import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import landingpage from "./landingpage.css";

const LandingPage = ({ setUsername, username, socket }) => {
  const navigate = useNavigate();

  useEffect(() => {
    socket.disconnect();
    socket.connect();
  }, []);
  

  const handleLogIn = () => {
    console.log(username);
    if (username === "") {
      alert("You have not entered a username");
      navigate("/", { replace: true });
    } else {
      socket.emit("join_server", { username });
      navigate("/home", { replace: true });
    }
  };

  return (
    <div className="main-container">
      <div className="login-box">
        <form>
          <div className="login-info">
            <h1 className="login-title">Welcome</h1>
            <p className="login-text">Please enter your username to log in...</p>
          </div>
          <div className="user-box">
            <input
              onChange={(event) => setUsername(event.target.value)}
              required
            />
            <label>Name</label>
          </div>
          <a onClick={handleLogIn}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Join Chat
          </a>
        </form>
      </div>
    </div>
  );
};

export default LandingPage;
