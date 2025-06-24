import { useState, useEffect } from "react";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  languageCode: string;
}

interface WebSocketMessage {
  messageType: string;
  user: User;
}

export default function WebSocketComponent() {
  const [receivedMessages, setReceivedMessages] = useState<string[]>([]);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket("wss://oleg181219-stepbycrocs-c321.twc1.net/ws");
    // const ws = new WebSocket("wss://echo.websocket.org");

    ws.onopen = () => {
      console.log("Connected to WebSocket server");
      sendInitialMessage(ws);
    };

    ws.onmessage = (event) => {
      setReceivedMessages((prev) => [...prev, event.data]);
    };

    ws.onclose = () => {
      console.log("Disconnected from WebSocket server");
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    setSocket(ws);
    console.log(socket);

    return () => {
      ws.close();
    };
  }, []);

  const sendInitialMessage = (ws: WebSocket) => {
    const message: WebSocketMessage = {
      messageType: "USER_REQUEST",
      user: {
        id: Math.floor(Math.random() * 10000),
        firstName: "Name",
        lastName: "zzzzzz",
        username: "name",
        languageCode: "ru",
      },
    };

    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(message));
    } else {
      console.log("WebSocket not ready yet");
    }
  };

  return (
    <div className="text-black">
      <h2>WebSocket Connection</h2>
      <div>
        <h3>Received Messages:</h3>
        <ul>
          {receivedMessages.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
