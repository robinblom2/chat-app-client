import { useNavigate } from "react-router-dom";


const LandingPage = ({setUsername, username}) => {

  const navigate = useNavigate();

  const handleLogIn = () =>{
    console.log(username)
    if(username === ''){
      alert('You have not entered a username');
      navigate('/', {replace: true});
    }else {
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