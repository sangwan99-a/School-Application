import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { createStompClient } from '../utils/stomp';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [senderId, setSenderId] = useState(1); // TODO: Replace with actual user id
  const [receiverId, setReceiverId] = useState(2); // TODO: Select receiver
  const stompClientRef = useRef(null);

  useEffect(() => {
    // Fetch received messages (history)
    axios.get(`/api/messages/received/${senderId}`)
      .then(res => setMessages(res.data))
      .catch(() => setMessages([]));
    // Setup WebSocket
    stompClientRef.current = createStompClient((msg) => {
      setMessages(prev => [...prev, msg]);
    });
    stompClientRef.current.activate();
    return () => {
      if (stompClientRef.current) stompClientRef.current.deactivate();
    };
  }, [senderId]);

  const sendMessage = () => {
    const msg = {
      content: input,
      sender: senderId.toString(),
      receiver: receiverId.toString(),
      type: 'STUDENT_TO_TEACHER',
      timestamp: new Date().toISOString()
    };
    if (stompClientRef.current && stompClientRef.current.connected) {
      stompClientRef.current.publish({
        destination: '/app/chat.send',
        body: JSON.stringify(msg)
      });
      setInput("");
    }
    // Optionally, also save to backend for persistence
    axios.post('/api/messages', {
      content: input,
      sender: { id: senderId },
      receiver: { id: receiverId },
      timestamp: msg.timestamp,
      type: msg.type
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Chat</h2>
      <div className="border rounded p-2 h-96 overflow-y-auto mb-2">
        {messages.map((msg, idx) => (
          <div key={idx} className="mb-1">
            <b>{msg.sender}</b>: {msg.content}
          </div>
        ))}
      </div>
      <input className="border rounded w-full p-2" value={input} onChange={e => setInput(e.target.value)} placeholder="Type your message..." />
      <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded" onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;
