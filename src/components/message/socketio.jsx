import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:4000'); // Connect to the backend server

const App = () => {
    const [message, setMessage] = useState(''); // For the input field
    const [messages, setMessages] = useState([]); // To store all messages
    const userId = '66efd656d951350c10292bc2';  // Assume user ID is available (hardcoded for now)

    useEffect(() => {
        // Fetch all previous messages when the client connects
        socket.emit('get messages');

        // Listen for all previous messages
        socket.on('all messages', (msgs) => {
            setMessages(msgs);  // Set all fetched messages to state
        });

        // Listen for new incoming messages
        socket.on('chat message', (msg) => {
            setMessages((prevMessages) => [...prevMessages, msg]);
        });

        // Clean up the socket connection when the component unmounts
        return () => {
            socket.off('chat message');
            socket.off('all messages');
        };
    }, []);

    const sendMessage = () => {
        if (message.trim()) {
            // Emit the message along with the userId to the server
            socket.emit('chat message', { userId, message });
            setMessage('');  // Clear the input after sending
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Real-Time Chat</h1>
            <div style={{ border: '1px solid #ddd', height: '300px', overflowY: 'scroll', padding: '10px', marginBottom: '10px' }}>
                {messages.map((msg, idx) => (
                    <div key={idx} style={{ padding: '5px 0' }}>
                        <b>{msg.userId}: {msg.message}</b>
                    </div>
                ))}
            </div>
            <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => (e.key === 'Enter' ? sendMessage() : null)}
                placeholder="Type your message..."
                style={{ padding: '10px', width: '80%', marginRight: '10px' }}
            />
            <button onClick={sendMessage} style={{ padding: '10px' }}>Send</button>
        </div>
    );
};

export default App;
