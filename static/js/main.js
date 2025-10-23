const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-btn');

// Append message to chat
function appendMessage(message, sender) {
    const msg = document.createElement('div');
    msg.classList.add('message', sender);
    msg.textContent = message;
    chatBox.appendChild(msg);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Send user message and get AI response
function sendMessage() {
    const text = userInput.value.trim();
    if (!text) return;

    appendMessage(text, 'user');
    userInput.value = '';

    // Call AI backend
    getAIResponse(text)
      .then(botReply => {
        appendMessage(botReply, 'bot');
      })
      .catch(err => {
        appendMessage("Error: Could not get response.", 'bot');
        console.error(err);
      });
}

// Example AI backend function (replace with real API call)
async function getAIResponse(userText) {
    // Example: simulate AI processing
    return new Promise(resolve => {
        setTimeout(() => {
            resolve("Here is the AI reply to your question: " + userText);
        }, 500);
    });

    /* Example if using OpenAI API:
    const response = await fetch('/api/openai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: userText })
    });
    const data = await response.json();
    return data.answer;
    */
}

// Button click
sendButton.addEventListener('click', sendMessage);

// Enter key to send, Shift+Enter for newline
userInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});
