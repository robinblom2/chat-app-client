import { useNavigate } from "react-router-dom";



const LandingPage = ({setUsername, username, socket }) => {

  const navigate = useNavigate();

  const handleLogIn = () =>{
    console.log(username)
    if(username === ''){
      alert('You have not entered a username');
      navigate('/', {replace: true});
    }else {
      socket.emit('join_server', {username})
      navigate('/home', {replace: true})
    }
  }

  return <div>
    <div>
    <input
        placeholder="Username..."
        onChange={(event) => setUsername(event.target.value)}
      />
        <button onClick={handleLogIn}>Sign In</button>
    </div>

  </div>
}

export default LandingPage;