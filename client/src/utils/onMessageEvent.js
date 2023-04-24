const createOnMessageEvent = () => {
  const token = localStorage.getItem('token');

  document.getElementById('submitChat').addEventListener('click', () => {
    const msgInput = document.getElementById('chatbox');
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
