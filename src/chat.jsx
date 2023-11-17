/* eslint-disable react/prop-types */
import React from 'react';
const { useState } = React;
import ScrollToBottom from 'react-scroll-to-bottom';

export const Chat = (props) => {
  const { socket, name, room } = props;
  const [currentMessage, setCurrentMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  const [sender, setSender] = useState('');
  const sendMessage = async () => {
    if (currentMessage) {
      const messageData = {
        name,
        room,
        currentMessage,
        time: new Date(Date.now()).toLocaleTimeString(),
      };
      await socket.emit('send_message', messageData);
      setMessageList([...messageList, messageData]);
      setCurrentMessage('');
      console.log(messageData.name);
      setSender(messageData.name);
    }
  };

  socket.on('receive_message', (data) => {
    setMessageList([...messageList, data]);
    setCurrentMessage('');
  });

  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>{name}</p>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList.map((messageContent) => {
            return (
              <div
                key={messageContent.time}
                className="message"
                id={name === messageContent.name ? 'you' : 'other'}
              >
                <div>
                  <div className="message-content">
                    <p>{messageContent.currentMessage}</p>
                  </div>
                  <div className="message-meta">
                    <p id="time">{messageContent.time}</p>
                    <p id="author">{messageContent.name}</p>
                  </div>
                </div>
              </div>
            );
          })}
          {/* {currentMessage && (
            <p id="time">
              {currentMessage && (
                <p id="time">{`${
                  sender == name ? name : sender
                } is typing`}</p>
              )}
            </p>
          )} */}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={currentMessage}
          placeholder="hey..."
          onChange={(e) => {
            setCurrentMessage(e.target.value);
          }}
          onKeyPress={(event) => {
            event.key === 'Enter' && sendMessage();
          }}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  );
};
