import { useEffect } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

const WebSocketComponent = () => {
  useEffect(() => {
    // Создаем подключение
    const socket = new SockJS("https://85.193.81.139/ws");
    const stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      debug: (str) => console.log(str),
      onConnect: () => {
        console.log("Connected to WebSocket");

        // Отправляем JSON-объект при подключении
        // const message = {
        //   type: "connection",
        //   timestamp: new Date().toISOString(),
        //   data: {
        //     messageType: "USER_REQUEST",
        //     user: {
        //       id: Math.floor(Math.random() * 10000),
        //       firstName: "Name",
        //       lastName: "nfjfjfj",
        //       username: "name",
        //       languageCode: "ru",
        //     },
        //   },
        // };

        const message = {
          messageType: "USER_REQUEST",
          user: {
            id: Math.floor(Math.random() * 10000),
            firstName: "Name",
            lastName: "xxxxx",
            username: "name",
            languageCode: "ru",
          },
        };

        stompClient.publish({
          destination: "/", // укажите нужный endpoint
          body: JSON.stringify(message),
        });

        console.log("Message sent:", message);
      },
      onStompError: (frame) => {
        console.error("Connection error:", frame.headers["message"]);
      },
    });

    stompClient.activate();

    // Очистка при размонтировании
    return () => {
      stompClient.deactivate();
    };
  }, []); // Пустой массив зависимостей = выполнить только при монтировании

  return (
    <div>
      <p>WebSocket connection established. Check console for details.</p>
    </div>
  );
};

export default WebSocketComponent;
