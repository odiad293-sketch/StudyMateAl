const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendButton = document.querySelector('.input-area button'); // send button

// Creator info
const creatorInfo = "I was created by Engineer Odia Etiosa Destiny, a computer science engineer passionate about AI and education.";

// Function to append a message to chat
function addMessage(content, className, autoScroll = true) {
    const msg = document.createElement('div');
    msg.classList.add('message', className); // 'user' or 'bot'
    msg.innerText = content;
    chatBox.appendChild(msg);

    // Auto-scroll only if allowed
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
        let botReply;

        // Check if user asks about the creator
        const creatorKeywords = ["who created you", "who made you", "your creator", "who built you"];
        if (creatorKeywords.some(kw => text.toLowerCase().includes(kw))) {
            botReply = creatorInfo;
        } else {
            // Send to backend
            const res = await fetch('/ask', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({message: text})
            });

            const data = await res.json();
            botReply = data.reply || "Error: " + (data.error || "Something went wrong");
        }

        addMessage(botReply, 'bot');

    } catch (err) {
        addMessage("Error: Could not get response.", 'bot');
        console.error(err);
    }
}

// Only send on button click
sendButton.addEventListener('click', sendMessage);

// Shift+Enter still adds a newline
userInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && e.shiftKey) {
        const cursorPos = userInput.selectionStart;
        const textBefore = userInput.value.substring(0, cursorPos);
        const textAfter = userInput.value.substring(cursorPos);
        userInput.value = textBefore + '\n' + textAfter;
        userInput.selectionStart = userInput.selectionEnd = cursorPos + 1;
        e.preventDefault();
    }
});
