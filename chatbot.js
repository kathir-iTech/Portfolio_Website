// Chatbot UI Controls
const chatToggle = document.getElementById("chat-toggle");
const chatWindow = document.getElementById("chat-window");
const closeChat = document.getElementById("close-chat");
const sendBtn = document.getElementById("send-btn");
const chatInput = document.getElementById("chat-input");
const chatBody = document.getElementById("chat-body");

chatToggle.addEventListener("click", () => chatWindow.classList.remove("hidden"));
closeChat.addEventListener("click", () => chatWindow.classList.add("hidden"));
sendBtn.addEventListener("click", sendMessage);
chatInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
});

function appendMessage(sender, text) {
    const msg = document.createElement("div");
    msg.className = sender === "user" ? "user-message" : "bot-message";
    msg.innerText = text;
    chatBody.appendChild(msg);
    chatBody.scrollTop = chatBody.scrollHeight;
}

async function sendMessage() {
    const userText = chatInput.value.trim();
    if (!userText) return;

    appendMessage("user", userText);
    chatInput.value = "";

    // Show a "thinking" message
    appendMessage("bot", "🤖 Thinking...");

    try {
        const botReply = await getAIResponse(userText);
        chatBody.lastChild.remove(); // Remove "thinking" message
        appendMessage("bot", botReply);
    } catch (error) {
        chatBody.lastChild.remove();
        appendMessage("bot", "⚠️ Error fetching reply.");
    }
}

// Free AI API Call
async function getAIResponse(message) {
    const res = await fetch("https://api.mistral.ai/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer D3d3c9XN3puCMbZwNYCJmWiHmt80wmHD" // Replace with your free API key
        },
        body: JSON.stringify({
            model: "mistral-tiny", // Free model
            messages: [{ role: "user", content: message }]
        })
    });

    const data = await res.json();
    return data.choices[0].message.content;
}
