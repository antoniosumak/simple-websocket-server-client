const messages = document.querySelector('.messages');
const button = document.querySelector('.send');
const inputValue = document.getElementById('input');

const socket = new WebSocket('ws://localhost:3000');

socket.addEventListener('open', () => {
  console.log('Connection opened!');
});

socket.addEventListener('error', (error) => console.log(error));

socket.addEventListener('message', (event) => {
  const newMessage = document.createElement('p');

  const arr = JSON.parse(event.data).data;
  let newData = '';
  arr.forEach((element) => {
    newData += String.fromCharCode(element);
  });
  newMessage.textContent = newData;

  messages.append(newMessage);
});

const sendMessage = () => {
  socket.send(inputValue.value);
};

button.addEventListener('click', () => sendMessage());
