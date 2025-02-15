// let chatHistory = [];

//         function sendMessage() {
//             let userInput = document.getElementById("message-input").value;
//             if (userInput.trim() === "") return;

//             appendMessage("You: " + userInput, "user-message");

//             fetch("/chat", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//                 credentials: "include",
//                 body: JSON.stringify({ message: userInput, history: chatHistory })
//             })
//             .then(response => response.json())
//             .then(data => {
//                 appendMessage("Bot: " + data.message, "bot-message");
//                 chatHistory = data.history;
//             })
//             .catch(error => console.error("Error:", error));

//             document.getElementById("message-input").value = "";
//         }

//         function appendMessage(text, className) {
//             let chatBox = document.getElementById("chat-box");
//             let messageDiv = document.createElement("div");
//             messageDiv.className = "message " + className;
//             messageDiv.textContent = text;
//             messageDiv.style.color = "#ffffff";
//             chatBox.appendChild(messageDiv);
//             chatBox.scrollTop = chatBox.scrollHeight;
//         }
document.addEventListener("DOMContentLoaded", function () {
    const chatBox = document.getElementById("chat-box");
    const messageInput = document.getElementById("message-input");
    const sendButton = document.getElementById("send-button");

    function appendMessage(content, isUser) {
        const messageDiv = document.createElement("div");
        messageDiv.classList.add("p-3", "rounded-lg", "max-w-xs", "w-fit");

        if (isUser) {
            messageDiv.classList.add("bg-blue-500", "text-white", "self-end");
        } else {
            messageDiv.classList.add("bg-purple-600", "text-white", "self-start");
        }

        messageDiv.textContent = content;
        chatBox.appendChild(messageDiv);

        chatBox.scrollTop = chatBox.scrollHeight;
    }

    function sendMessage() {
        const message = messageInput.value.trim();
        if (!message) return;

        appendMessage(message, true);
        messageInput.value = "";

        fetch("/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ message: message, history: [] }),
        })
            .then((response) => response.json())
            .then((data) => {
                appendMessage(data.message, false);
            })
            .catch((error) => console.error("Error:", error));
    }

    sendButton.addEventListener("click", sendMessage);
    messageInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") sendMessage();
    });
});
