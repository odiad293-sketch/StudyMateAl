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

// Send message
async function sendMessage() {
    const text = userInput.value.trim();
    if (!text) return;

    appendMessage(text, 'user');
    userInput.value = '';

    try {
        const botReply = await getAIResponse(text);
        appendMessage(botReply, 'bot');
    } catch (err) {
        appendMessage("Error: Could not get AI response.", 'bot');
        console.error(err);
    }
}

// Call OpenAI API (replace YOUR_API_KEY with your key)
async function getAIResponse(userText) {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer YOUR_API_KEY"
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: userText }],
            max_tokens: 300
        })
    });
    const data = await response.json();
    return data.choices[0].message.content;
}

// Button click
sendButton.addEventListener('click', sendMessage);

// Enter key to send, Shift+Enter for new line
userInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});
