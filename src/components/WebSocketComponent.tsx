import { useState, useEffect, useCallback } from 'react';
import SockJS from 'sockjs-client';
// import SockJS from 'sockjs-client/dist/sockjs.min.js';
import { Client, IMessage, StompSubscription } from '@stomp/stompjs';


interface ChatMessage {
  content: string;
  sender?: string;
  timestamp?: string;
}

const WebSocketComponent = () => {
  const [message, setMessage] = useState('');
  const [receivedMessages, setReceivedMessages] = useState<ChatMessage[]>([]);
  const [stompClient, setStompClient] = useState<Client | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [subscription, setSubscription] = useState<StompSubscription | null>(null);

  // Initialize WebSocket connection
  useEffect(() => {
    const socket = new SockJS('http://94.228.125.251:8080/ws');
    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      debug: (str) => console.log(str),
    });

    client.onConnect = () => {
      console.log('Connected to WebSocket server');
      setIsConnected(true);
      
      // Subscribe to the topic
      const sub = client.subscribe('/topic/messages', (message: IMessage) => {
        const receivedMessage: ChatMessage = JSON.parse(message.body);
        setReceivedMessages(prev => [...prev, receivedMessage]);
      });
      setSubscription(sub);
    };

    client.onStompError = (frame) => {
      console.error('Broker reported error: ' + frame.headers['message']);
      console.error('Additional details: ' + frame.body);
    };

    client.onDisconnect = () => {
      console.log('Disconnected from WebSocket server');
      setIsConnected(false);
      setSubscription(null);
    };

    client.activate();
    setStompClient(client);

    // Cleanup on component unmount
    return () => {
      subscription?.unsubscribe();
      client.deactivate();
    };
  }, []);

  const sendMessage = useCallback(() => {
    if (stompClient && isConnected && message.trim()) {
      const chatMessage: ChatMessage = {
        content: message,
        sender: 'user', // You can modify this
        timestamp: new Date().toISOString(),
      };
      
      stompClient.publish({
        destination: '/',
        body: JSON.stringify(chatMessage),
      });
      setMessage('');
    } else {
      console.log('WebSocket not connected or message empty');
    }
  }, [stompClient, isConnected, message]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className='text-black'>
      <h2>WebSocket Chat</h2>
      <p>Status: {isConnected ? 'Connected' : 'Disconnected'}</p>
      
      <div>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
        />
        <button 
          onClick={sendMessage} 
          disabled={!isConnected || !message.trim()}
        >
          Send Message
        </button>
      </div>
      
      <div>
        <h3>Received Messages:</h3>
        <ul>
          {receivedMessages.map((msg, index) => (
            <li key={index}>
              <strong>{msg.sender}:</strong> {msg.content}
              <small>{msg.timestamp && new Date(msg.timestamp).toLocaleTimeString()}</small>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WebSocketComponent;