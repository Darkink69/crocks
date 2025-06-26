import { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import store from "../store/store";

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

export const WebSocketComponent = observer(() => {
  // export default function () {
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
      console.log(receivedMessages, "received!");
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
        id: store.user?.id || 1,
        firstName: store.user?.first_name || "firstName",
        lastName: store.user?.last_name || "lastName",
        username: store.user?.user_name || "username",
        languageCode: store.user?.languageCode || "ru",
      },
    };

    console.log(message);

    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(message));
      console.log(message, "send!");
    } else {
      console.log("WebSocket not ready yet");
    }
  };

  return (
    <></>
    // <div className="text-black">
    //   <h2>WebSocket Connection</h2>
    //   <div>
    //     <h3>Received Messages:</h3>
    //     <ul>
    //       {receivedMessages.map((msg, index) => (
    //         <li key={index}>{msg}</li>
    //       ))}
    //     </ul>
    //   </div>
    // </div>
  );
});

export default WebSocketComponent;
