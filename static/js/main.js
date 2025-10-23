// Get DOM elements
const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendButton = document.querySelector('.input-area button');

// Function to append a message to the chat
function appendMessage(message, sender) {
    const msg = document.createElement('div');
    msg.classList.add('message', sender); // 'user' or 'bot'
    msg.textContent = message;
    chatBox.appendChild(msg);

    // Scroll chat to bottom
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Function to send a message
function sendMessage() {
    const text = userInput.value.trim();
    if (!text) return;

    // 1. Append user message
    appendMessage(text, 'user');

    // Clear the textarea
    userInput.value = '';

    // 2. Call AI/VHDL backend to get a response
    // Replace this with your actual AI function
    getAIResponse(text).then(botReply => {
        appendMessage(botReply, 'bot');
    });
}

// Example placeholder function for AI response (replace with your backend)
function getAIResponse(userText) {
    return new Promise(resolve => {
        // Simulate AI processing delay
        setTimeout(() => {
            resolve("Studymate.ai response: " + userText);
        }, 500); // 500ms delay
    });
}

// Send message when send button is clicked
sendButton.addEventListener('click', sendMessage);

// Send message on Enter key, allow Shift+Enter for new line
userInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault(); // prevent newline
        sendMessage();
    }
});
