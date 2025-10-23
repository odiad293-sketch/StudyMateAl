// Get DOM elements
const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-btn');

// Append message to chat
function appendMessage(message, sender) {
    const msg = document.createElement('div');
    msg.classList.add('message', sender); // 'user' or 'bot'
    msg.textContent = message;
    chatBox.appendChild(msg);
    chatBox.scrollTop = chatBox.scrollHeight; // auto-scroll
}

// Send message
async function sendMessage() {
    const text = userInput.value.trim();
    if (!text) return;

    // Append user message
    appendMessage(text, 'user');
    userInput.value = '';

    try {
        // Call backend AI endpoint
        const botReply = await getAIResponse(text);
        appendMessage(botReply, 'bot');
    } catch (err) {
        appendMessage("Error: Could not get response.", 'bot');
        console.error(err);
    }
}

// Function to call backend AI endpoint
async function getAIResponse(userText) {
    const response = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: userText })
    });

    if (!response.ok) throw new Error("Network response was not ok");

    const data = await response.json();
    return data.answer;
}

// Button click to send
sendButton.addEventListener('click', sendMessage);

// Enter key sends message, Shift+Enter adds newline
userInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});
