const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');

function addMessage(content, className) {
  const msg = document.createElement('div');
  msg.classList.add('message', className);
  msg.innerText = content;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

async function sendMessage() {
  const text = userInput.value.trim();
  if (!text) return;

  addMessage(text, 'user');
  userInput.value = '';

  const res = await fetch('/ask', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({message: text})
  });

  const data = await res.json();
  if (data.reply) addMessage(data.reply, 'bot');
  else addMessage("Error: " + (data.error || "Something went wrong"), 'bot');
}
