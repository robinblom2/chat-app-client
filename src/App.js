import './App.css';
import Home from './views/home/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { io } from 'socket.io-client';
import ChatRoom from './views/chat/ChatRoom';

const socket = io.connect('http://localhost:1337');

function App() {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={ <Home 
            username={username} 
            setUsername={setUsername} 
            room={room} 
            setRoom={setRoom} 
            socket={socket}/>
          }/>
          <Route path="/chatroom" element={<ChatRoom />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
