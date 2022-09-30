import './App.css';
import Home from './views/home/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { io } from 'socket.io-client';
import ChatRoom from './views/chat/ChatRoom';
import LandingPage from './views/landingpage/LandingPage';
import PrivateChat from './views/privatechat/PrivateChat';

const socket = io.connect('http://localhost:1337');

function App() {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={<LandingPage setUsername={setUsername} username={username} socket={socket} />}/>
          <Route path='/home' element={ <Home 
            username={username} 
            room={room} 
            setRoom={setRoom} 
            socket={socket}/>
          }/>
          <Route path="/chatroom" element={<ChatRoom socket={socket} username={username} room={room} />}/>
          <Route path="/privatechat" element={<PrivateChat socket={socket}/>} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
