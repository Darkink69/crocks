import { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import store from "../store/store";

interface User {
  id: number;
  firstName: string;
  languageCode: string;
}

interface WebSocketMessage {
  messageType: string;
  user: User;
}

interface StepsUpdateMessage {
  messageType: string;
  chatId: number;
  result: boolean;
  steps: number;
}

export const WebSocketComponent = observer(() => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const ws = new WebSocket(import.meta.env.VITE_API_URL + "/ws");

    ws.onopen = () => {
      console.log("Connected to WebSocket server");
      sendUserRequest(ws);
    };

    ws.onmessage = (event) => {
      const response = JSON.parse(event.data);
      console.log("Received:", response);

      if (!isInitialized && response.success) {
        setIsInitialized(true);
        sendStepsUpdate(ws);
      }
    };

    ws.onclose = () => console.log("Disconnected");
    ws.onerror = (error) => console.error("WebSocket error:", error);

    setSocket(ws);
    console.log(socket);

    return () => ws.close();
  }, []);

  const sendUserRequest = (ws: WebSocket) => {
    const message: WebSocketMessage = {
      messageType: "USER_REQUEST",
      user: {
        id: store.user?.id || 0,
        firstName: store.user?.first_name || "firstName",
        languageCode: store.user?.language_code || "ru",
      },
    };
    ws.send(
      JSON.stringify({
        ...message,
        endpoint: "/ws/user", // Добавляем поле для маршрутизации на сервере
      })
    );
  };

  const sendStepsUpdate = (ws: WebSocket) => {
    const message: StepsUpdateMessage = {
      messageType: "STEPS_UPDATE",
      chatId: store.user?.id,
      result: true,
      steps: store.steps,
    };
    ws.send(
      JSON.stringify({
        ...message,
        endpoint: "/ws/steps", // Маршрутизация на сервере
      })
    );
  };

  return null;
});

export default WebSocketComponent;

// import { useState, useEffect } from "react";
// import { observer } from "mobx-react-lite";
// import store from "../store/store";

// interface User {
//   id: number;
//   firstName: string;
//   languageCode: string;
// }

// interface WebSocketMessage {
//   messageType: string;
//   user: User;
// }

// export const WebSocketComponent = observer(() => {
//   const [receivedMessages, setReceivedMessages] = useState<string[]>([]);
//   const [socket, setSocket] = useState<WebSocket | null>(null);

//   useEffect(() => {
//     console.log(import.meta.env.VITE_API_URL);
//     const ws = new WebSocket(import.meta.env.VITE_API_URL + "/ws/user");
//     // const ws = new WebSocket("wss://oleg181219-stepbycrocs-c321.twc1.net/ws");
//     // const ws = new WebSocket("wss://echo.websocket.org");

//     ws.onopen = () => {
//       console.log("Connected to WebSocket server");
//       sendInitialMessage(ws);
//     };

//     ws.onmessage = (event) => {
//       setReceivedMessages((prev) => [...prev, event.data]);
//     };

//     ws.onclose = () => {
//       console.log("Disconnected from WebSocket server");
//     };

//     ws.onerror = (error) => {
//       console.error("WebSocket error:", error);
//     };

//     setSocket(ws);
//     console.log(socket);

//     return () => {
//       ws.close();
//     };
//   }, []);

//   const sendInitialMessage = (ws: WebSocket) => {
//     const message: WebSocketMessage = {
//       messageType: "USER_REQUEST",
//       user: {
//         id: store.user?.id || 0,
//         firstName: store.user?.first_name || "firstName",
//         languageCode: store.user?.language_code || "ru",
//       },
//     };

//     console.log(message);

//     if (ws.readyState === WebSocket.OPEN) {
//       ws.send(JSON.stringify(message));
//       console.log(message, "send!");
//     } else {
//       console.log("WebSocket not ready yet");
//     }
//   };

//   useEffect(() => {
//     console.log(receivedMessages, "received!");
//   }, [receivedMessages]);

//   return (
//     <></>
//     // <div className="text-black">
//     //   <h2>WebSocket Connection</h2>
//     //   <div>
//     //     <h3>Received Messages:</h3>
//     //     <ul>
//     //       {receivedMessages.map((msg, index) => (
//     //         <li key={index}>{msg}</li>
//     //       ))}
//     //     </ul>
//     //   </div>
//     // </div>
//   );
// });

// export default WebSocketComponent;
