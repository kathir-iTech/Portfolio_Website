const chatToggle = document.getElementById("chat-toggle");
const chatWindow = document.getElementById("chat-window");
const closeChat = document.getElementById("close-chat");
const sendBtn = document.getElementById("send-btn");
const chatInput = document.getElementById("chat-input");
const chatBody = document.getElementById("chat-body");

// Open/Close Chat
chatToggle.addEventListener("click", () => {
  chatWindow.classList.toggle("hidden");
});

closeChat.addEventListener("click", () => {
  chatWindow.classList.add("hidden");
});

// Send message
sendBtn.addEventListener("click", sendMessage);
chatInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});

function sendMessage() {
  const text = chatInput.value.trim();
  if (!text) return;

  // Show user message
  appendMessage(text, "user-message");
  chatInput.value = "";

  // Placeholder bot response
  setTimeout(() => {
    appendMessage("Hi! I’m your AI Assistant. Soon I’ll be connected to OpenAI.", "bot-message");
  }, 500);
}

function appendMessage(message, className) {
  const msg = document.createElement("div");
  msg.classList.add("message", className);
  msg.textContent = message;
  chatBody.appendChild(msg);
  chatBody.scrollTop = chatBody.scrollHeight;
}
