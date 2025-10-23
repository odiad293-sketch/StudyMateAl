const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendButton = document.querySelector('.input-area button'); // your send button

// Function to append a message to chat
function addMessage(content, className, autoScroll = true) {
    const msg = document.createElement('div');
    msg.classList.add('message', className); // 'user' or 'bot'
    msg.innerText = content;
    chatBox.appendChild(msg);

    // Only auto-scroll if allowed
    if (autoScroll) {
        chatBox.scrollTop = chatBox.scrollHeight;
    }
}

// Function to send a message
async function sendMessage() {
    const text = userInput.value.trim();
    if (!text) return;

    // Append user message
    addMessage(text, 'user');

    // Clear input
    userInput.value = '';

    try {
        // Send message to backend
        const res = await fetch('/ask', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({message: text})
        });

        const data = await res.json();

        // Append bot reply
        if (data.reply) addMessage(data.reply, 'bot');
        else addMessage("Error: " + (data.error || "Something went wrong"), 'bot');

    } catch (err) {
        addMessage("Error: Could not get response.", 'bot');
        console.error(err);
    }
}

// Send message on button click
sendButton.addEventListener('click', sendMessage);

// Enter to send, Shift+Enter to add newline
userInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        if (e.shiftKey) {
            // Shift+Enter -> insert newline at cursor
            const cursorPos = userInput.selectionStart;
            const textBefore = userInput.value.substring(0, cursorPos);
            const textAfter = userInput.value.substring(cursorPos);
            userInput.value = textBefore + '\n' + textAfter;
            userInput.selectionStart = userInput.selectionEnd = cursorPos + 1;
        } else {
            // Enter -> send message
            e.preventDefault();
            sendMessage();
        }
    }
});
