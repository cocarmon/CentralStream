import './Chat.css';
import { socket } from './WebSocket';
import { useState, useEffect } from 'react';
import api from '../api';
import createOnMessageEvent from '../../utils/onMessageEvent';
import createWebSocket from '../../utils/chatWebsocket';

export const Chat = ({ channelArn }) => {
  const [numberOfViewers, setNumberOfViewers] = useState(0);

  useEffect(() => {
    socket.emit('getViewerCount', { channelArn });
    socket.on('setViewerCount', (data) => {
      setNumberOfViewers(data);
    });
    getChatToken(channelArn);

    // Sets event listeners for messages, sends to websockets
    createOnMessageEvent();

    // When componenent unmonts gets rid of eventlistener and closes the connection
    return () => {
      console.log('unmount');
      socket.off('setViewerCount');
      socket.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // Creates chat token that generates user capabilities
  // Viewers who aren't signed in won't be able to send messages
  const getChatToken = async (channelArn) => {
    const token = localStorage.getItem('token');
    const chatInformation = await api.post(
      '/streams/createChatToken',
      {
        channelArn,
      },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
    );
    // Creates websocket with chatEndpoint and chatToken
    createWebSocket(chatInformation.data);
  };

  return (
    <div className="broadcastContainer_box">
      <div className="broadcastContainer_two--people">
        <h3>Live Count: {numberOfViewers}</h3>
      </div>
      <div className="broadcastContainer_two--chat">
        <form className="chat_input" novalidate>
          <input
            id="chatbox"
            type="text"
            required
            placeholder="Start Chatting"
          />
          <button id="submitChat" type="submit">
            S
          </button>
        </form>
      </div>
    </div>
  );
};
