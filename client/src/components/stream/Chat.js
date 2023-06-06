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
    <>
      <div className="container-fluid col-12 min-vh-100 d-flex align-items-center justify-content-left ">
        <button
          className="navbar-toggler w-100"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#streamControls"
          aria-controls="streamControls"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="bi bi-arrow-bar-left text-white text-left"></i>
        </button>
      </div>

      <div
        className="offcanvas offcanvas-end d-flex flex-row custom-chat-background offcanvas-backdrop.show "
        id="streamControls"
      >
        <div className="col-1 justify-self-center">
          <button
            className="navbar-toggler h-100"
            type="button"
            data-bs-dismiss="streamControls"
            data-bs-toggle="offcanvas"
            data-bs-target="#streamControls"
            aria-controls="streamControls"
            aria-label="Close"
          >
            <i className="bi bi-arrow-bar-right text-white text-left"></i>
          </button>
        </div>
        <div className="col-11">
          <div className="offcanvas-header ">
            <h4 className="offcanvas-title text-white ">Chat</h4>
          </div>

          <div className="offcanvas-body d-flex flex-column-reverse h-100">
            <div className="card custom-chatbox-background ">
              <div className="card-body text-white custom-space ">
                <div class="input-group w-100 ">
                  <input
                    type="text"
                    className="form-control "
                    placeholder="Enter Message"
                    aria-label="Enter Message"
                    aria-describedby="button-addon2"
                  />
                  <button
                    className="btn btn-outline-secondary "
                    type="button"
                    id="button-addon2"
                  >
                    Button
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
