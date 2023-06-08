//
const createWebSocket = ({ chatToken, chatEndpoint }) => {
  window.chatConnection = new WebSocket(chatEndpoint, chatToken);

  window.chatConnection.onopen = (event) => {
    console.log('WebSocket connection opened.');
  };

  window.chatConnection.onmessage = (event) => {
    const message = JSON.parse(event.data);
    console.log(message.Content);

    // Update the UI with the incoming message
    const chatContainer = document.querySelector('.custom-input-chatbox');
    const messageEl = document.createElement('div');
    const inputChild = document.querySelector('.custom-input-child');
    messageEl.classList.add('messageClass');
    messageEl.textContent = `${message.Sender.Attributes.displayName}: ${message.Content}`;
    chatContainer.insertBefore(messageEl, inputChild);
  };

  window.chatConnection.onerror = (event) => {
    console.error('WebSocket error:', event);
  };

  window.chatConnection.onclose = (event) => {
    console.log('WebSocket connection closed:', event);
  };
};

module.exports = createWebSocket;
