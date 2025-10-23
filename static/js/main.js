const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendButton = document.querySelector('.input-area button'); // assumes your button exists

// Function to append a message to chat
function addMessage(content, className) {
    const msg = document.createElement('div');
    msg.classList.add('message', className); // 'user' or 'bot'
    msg.innerText = content;
    chatBox.appendChild(msg);
    chatBox.scrollTop = chatBox.scrollHeight; // auto-scroll
}

// Function to send a message
async function sendMessage() {
    const text = userInput.value.trim();
    if (!text) return;

    // 1. Append user message
    addMessage(text, 'user');

    // 2. Clear input
    userInput.value = '';

    try {
        // 3. Send message to backend
        const res = await fetch('/ask', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({message: text})
        });

        const data = await res.json();

        // 4. Append bot reply
        if (data.reply) addMessage(data.reply, 'bot');
        else addMessage("Error: " + (data.error || "Something went wrong"), 'bot');

    } catch (err) {
        addMessage("Error: Could not get response.", 'bot');
        console.error(err);
    }
}

// Button click to send message
sendButton.addEventListener('click', sendMessage);

// Enter key sends message, Shift+Enter for newline
userInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault(); // prevent newline
        sendMessage();
    }
});
