import './Chat.css';
import { socket } from './WebSocket';
import { useState, useEffect } from 'react';
import api from '../api';
import createOnMessageEvent from '../../utils/onMessageEvent';
import createWebSocket from '../../utils/chatWebsocket';

export const Chat = ({ channelArn }) => {
  const [numberOfViewers, setNumberOfViewers] = useState(0);

  // useEffect(() => {
  //   socket.emit('getViewerCount', { channelArn });
  //   socket.on('setViewerCount', (data) => {
  //     setNumberOfViewers(data);
  //   });
  //   getChatToken(channelArn);

  // Sets event listeners for messages, sends to websockets
  // createOnMessageEvent();

  // When componenent unmonts gets rid of eventlistener and closes the connection
  // return () => {
  //   console.log('unmount');
  //   socket.off('setViewerCount');
  //   socket.disconnect();
  // };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
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
    <div className="container-fluid col-12 min-vh-100 d-flex align-items-center">
      <div className="custom-slide-chat">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#streamControls"
          aria-controls="streamControls"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="bi bi-arrow-bar-left text-white"></i>
        </button>
        <div class="collapse navbar-collapse " id="streamControls">
          <ul class="d-flex align-items-center justify-content-center list-unstyled">
            <li class="nav-item"></li>
            <li class="nav-item input-group custom-input-width "></li>
            <li class="nav-item"></li>
          </ul>
        </div>
      </div>
    </div>
  );
};
