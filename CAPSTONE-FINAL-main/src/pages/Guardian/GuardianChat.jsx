import React, { useState } from 'react';

const GuardianChat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;

    const message = {
      id: Date.now(),
      sender: 'You',
      content: newMessage,
    };

    setMessages((prevMessages) => [...prevMessages, message]);
    setNewMessage('');
  };

  return (
    <div className="flex flex-col bg-gray-100 p-8 h-screen">

      {/* Start Chat Message */}
      <div className="text-center mb-6 text-lg text-green-800 font-semibold">
        <p>Start a chat with Dr. Urcia</p>
      </div>

      {/* Chat Area */}
      <div className="flex-1 bg-white p-6 rounded-lg shadow-lg overflow-y-auto mb-6">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'You' ? 'justify-end' : 'justify-start'} mb-4`}
          >
            <div
              className={`max-w-xs px-4 py-3 rounded-lg shadow-lg ${
                message.sender === 'You' 
                  ? 'bg-green-100 text-green-900 rounded-br-none'
                  : 'bg-blue-500 text-white rounded-bl-none'
              }`}
            >
              <p className="font-medium">{message.sender}</p>
              <p>{message.content}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="flex items-center space-x-4">
        <input
          type="text"
          className="flex-1 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button
          onClick={handleSendMessage}
          className="bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default GuardianChat;
