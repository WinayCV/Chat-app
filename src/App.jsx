import {useState} from 'react';
import io from 'socket.io-client';
import {Chat} from './chat';
import './index.css';

const socket = io.connect('http://localhost:3030');

function App() {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (room && name) {
      socket.emit('join_room', room);
      console.log(name);
      setShowChat(true);
    }
  };

  return (
    <>
      <div className="App">
        {!showChat ? (
          <div className="joinChatContainer">
            <h3>Join Room</h3>
            <input
              type="text"
              placeholder="name..."
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <input
              type="text"
              placeholder="room..."
              value={room}
              onChange={(e) => {
                setRoom(e.target.value);
              }}
              onKeyPress={(event) => {
                event.key === 'Enter' && joinRoom();
              }}
            />
            <button onClick={joinRoom}>Join</button>
          </div>
        ) : (
          <Chat socket={socket} name={name} room={room} />
        )}
      </div>
    </>
  );
}

export default App;
