import React, { useState, useEffect, useRef } from 'react';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isCalling, setIsCalling] = useState(false);
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerConnectionRef = useRef(null);
  
  // STUN server configuration for WebRTC
  const configuration = {
    iceServers: [
      { urls: 'stun:stun.l.google.com:19302' }, // Use Google STUN server
    ],
  };

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

  const startCall = async () => {
    try {
      // Get the local media stream (video/audio)
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      localVideoRef.current.srcObject = stream;

      // Create a new RTCPeerConnection
      peerConnectionRef.current = new RTCPeerConnection(configuration);

      // Add the local stream tracks to the connection
      stream.getTracks().forEach((track) => {
        peerConnectionRef.current.addTrack(track, stream);
      });

      // Listen for remote stream
      peerConnectionRef.current.ontrack = (event) => {
        remoteVideoRef.current.srcObject = event.streams[0];
      };

      // Create offer and set local description
      const offer = await peerConnectionRef.current.createOffer();
      await peerConnectionRef.current.setLocalDescription(offer);

      // Here, you would send the offer to the other peer (via signaling server)
      console.log('Offer sent:', offer);
      setIsCalling(true);
    } catch (error) {
      console.error('Error starting call:', error);
      alert('Could not start the video call. Please check permissions and try again.');
    }
  };

  const handleReceiveCall = async (offer) => {
    try {
      peerConnectionRef.current = new RTCPeerConnection(configuration);
      
      // When a remote track is added, display it
      peerConnectionRef.current.ontrack = (event) => {
        remoteVideoRef.current.srcObject = event.streams[0];
      };

      // Set the remote description with the received offer
      await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(offer));

      // Get the local media stream (video/audio)
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      localVideoRef.current.srcObject = stream;

      // Add the local stream tracks to the connection
      stream.getTracks().forEach((track) => {
        peerConnectionRef.current.addTrack(track, stream);
      });

      // Create an answer and set local description
      const answer = await peerConnectionRef.current.createAnswer();
      await peerConnectionRef.current.setLocalDescription(answer);

      // Here, you would send the answer back to the other peer (via signaling server)
      console.log('Answer sent:', answer);
    } catch (error) {
      console.error('Error handling incoming call:', error);
      alert('Could not handle the incoming call. Please try again.');
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-green-100 p-10 h-screen">
      <h1 className="text-2xl font-bold text-green-900 mb-6">Chat</h1>

      {/* Video Call Area */}
      <div className="flex mb-4">
        <video ref={localVideoRef} autoPlay className="border w-1/2 h-64 mr-2" />
        <video ref={remoteVideoRef} autoPlay className="border w-1/2 h-64" />
      </div>

      {/* Chat Area */}
      <div className="flex-1 bg-white p-5 rounded-lg shadow-lg overflow-y-auto">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`mb-4 p-3 rounded-lg shadow-sm ${
              message.sender === 'You' ? 'bg-green-200 self-end' : 'bg-green-600 text-white self-start'
            }`}
          >
            <p className="font-semibold">{message.sender}</p>
            <p>{message.content}</p>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="flex mt-4">
        <input
          type="text"
          className="flex-1 p-3 rounded-lg border border-green-400"
          placeholder="Type your message here..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button
          onClick={handleSendMessage}
          className="ml-4 bg-green-600 text-white p-3 rounded-lg hover:bg-green-700"
        >
          Send
        </button>
        <button
          onClick={startCall}
          className="ml-4 bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
        >
          {isCalling ? 'Call in Progress' : 'Start Call'}
        </button>
      </div>
    </div>
  );
};

export default Chat;
