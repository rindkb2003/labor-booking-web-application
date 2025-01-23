document.addEventListener('DOMContentLoaded', function() {
    const chatMessages = document.getElementById('chatMessages');
    const messageInput = document.getElementById('messageInput');
    const sendMessageButton = document.getElementById('sendMessageButton');
    const workerId = document.getElementById('workerId').value;
    const customerId = document.getElementById('customerId').value;

    if (!workerId || !customerId) {
        console.error('workerId or customerId is missing');
        return;
    }

    function createMessageElement(message, isSentByCustomer) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', isSentByCustomer ? 'sent' : 'received');

        const messageImage = document.createElement('img');
        messageImage.classList.add('message-image');
        messageImage.src = isSentByCustomer ? message.customer_image : message.worker_image;
        messageImage.alt = isSentByCustomer ? 'Customer' : 'Worker';

        const messageContent = document.createElement('div');
        messageContent.classList.add('message-content');
        messageContent.textContent = message.message;

        const messageName = document.createElement('div');
        messageName.classList.add('message-name');
        messageName.textContent = isSentByCustomer ? message.customer_name : message.worker_name;

        messageElement.appendChild(messageImage);
        messageElement.appendChild(messageContent);
        messageElement.appendChild(messageName);
        return messageElement;
    }

    function fetchMessages() {
        fetch(`../PHP%20files/fetch_messages.php?worker_id=${workerId}&customer_id=${customerId}`)
            .then(response => response.json())
            .then(data => {
                chatMessages.innerHTML = '';
                data.forEach(message => {
                    const isSentByCustomer = message.sender_id == customerId;
                    const messageElement = createMessageElement(message, isSentByCustomer);
                    chatMessages.appendChild(messageElement);
                });
                chatMessages.scrollTop = chatMessages.scrollHeight;
            })
            .catch(error => {
                console.error('Error fetching messages:', error);
            });
    }

    sendMessageButton.addEventListener('click', function() {
        const message = messageInput.value;
        if (message.trim() !== '') {
            fetch('../PHP%20files/send_message.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    sender_id: customerId,
                    receiver_id: workerId,
                    message: message
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    messageInput.value = '';
                    const isSentByCustomer = data.data.sender_id == customerId;
                    const newMessageElement = createMessageElement(data.data, isSentByCustomer);
                    chatMessages.appendChild(newMessageElement);
                    chatMessages.scrollTop = chatMessages.scrollHeight;
                }
            })
            .catch(error => {
                console.error('Error sending message:', error);
            });
        }
    });

    setInterval(fetchMessages, 2000); // Fetch messages every 2 seconds
    fetchMessages(); // Initial fetch
});
