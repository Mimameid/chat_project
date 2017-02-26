(function () {
	'use strict';

	const chatMessages = firebase.database().ref('messages');
	const chatLogElem = document.getElementById('chat-log');
	const sendMessageBtn = document.getElementById('send-message-button');
	const chatMessageText = document.getElementById('chat-message');

	sendMessageBtn.addEventListener('click', () => {
		// 1. get message contents from text area
		const message = chatMessageText.value;

		// 2. send message to database
		chatMessages.push({message: message});

		// 3. clear text area
		chatMessageText.value = '';
	});

	chatMessages.on('child_added', snapshot => {
		// 1. create element
		const element = document.createElement('div');
		
		// 2. set element content
		const chatMessage = snapshot.val().message;
		element.textContent = chatMessage;
		console.log('Chat message received:', chatMessage);
		
		// 3. append element to chat log
		chatLogElem.appendChild(element);

		// 4. scroll the chat log down
		chatLogElem.scrollTop = chatLogElem.scrollHeight;
	});

})();