// Get DOM elements
const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendButton = document.querySelector('.input-area button');

// Function to append message to chat
function appendMessage(message, sender) {
    const msg = document.createElement('div');
    msg.classList.add('message', sender); // 'user' or 'bot'
    msg.textContent = message;
    chatBox.appendChild(msg);

    // Auto-scroll to bottom whenever a new message is added
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Function to send message
function sendMessage() {
    const text = userInput.value.trim();
    if (!text) return;

    // Append user message
    appendMessage(text, 'user');

    // Clear input box
    userInput.value = '';

    // Call your AI function here (replace with your actual function)
    const botReply = getBotResponse(text); // Example placeholder
    appendMessage(botReply, 'bot');
}

// Example AI response function (replace with your actual AI/VHDL logic)
function getBotResponse(input) {
    return `Studymate.ai Response: "${input}"`; // temporary placeholder
}

// Send message when button is clicked
sendButton.addEventListener('click', sendMessage);

// Send message on Enter key (Shift+Enter for new line)
userInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault(); // prevent newline
        sendMessage();
    }
});
