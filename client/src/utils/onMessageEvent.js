// Adds event listener, for messages
const createOnMessageEvent = () => {
  const token = localStorage.getItem('token');

  document.getElementById('submitChat').addEventListener('submit', () => {
    const msgInput = document.getElementById('chat-box');
    const payload = {
      action: 'SEND_MESSAGE',
      content: msgInput.value,
      attributes: {
        username: 'username',
      },
    };
    try {
      console.log(token);
      if (token) {
        window.chatConnection.send(JSON.stringify(payload));
      }
    } catch (e) {
      console.error(e);
    }
    msgInput.value = '';
    msgInput.focus();
  });
};
module.exports = createOnMessageEvent;
