// Connect to the Socket.IO server
const socket = io('http://localhost:3000');

// Get references to HTML elements
const messageContainer = document.getElementById('message-container');
const messageForm = document.getElementById('send-container');
const messageInput = document.getElementById('message-input');

// Prompt user for their name
const name = prompt('What is your name?');
appendMessage('You joined');
// Emit a 'new-user' event to inform the server about the new user
socket.emit('new-user', name);

// Listen for 'chat-message' events and append them to the message container
socket.on('chat-message', data => {
  appendMessage(`${data.name}: ${data.message}`);
});

// Listen for 'user-connected' events and display when a user connects
socket.on('user-connected', name => {
  appendMessage(`${name} connected`);
});

// Listen for 'user-disconnected' events and display when a user disconnects
socket.on('user-disconnected', name => {
  appendMessage(`${name} disconnected`);
});

// Listen for the form submission event and send chat messages
messageForm.addEventListener('submit', e => {
  e.preventDefault();
  const message = messageInput.value;
  appendMessage(`You: ${message}`);
  // Emit a 'send-chat-message' event to send the chat message to the server
  socket.emit('send-chat-message', message);
  messageInput.value = '';
});

// Function to append a new message to the message container
function appendMessage(message) {
  const messageElement = document.createElement('div');
  messageElement.innerText = message;
  messageContainer.append(messageElement);
}