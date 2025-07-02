import { useState, useEffect, useRef } from "react";
import { observer } from "mobx-react-lite";
import store from "../store/store";

interface User {
  id: number;
  firstName: string;
  languageCode: string;
}

interface Steps {
  id: number;
  steps: number;
}

interface WebSocketMessage {
  endpoint: string;
  payload: User;
}

interface StepsUpdateMessage {
  endpoint: string;
  payload: Steps;
}

export const WebSocketComponent = observer(() => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const intervalRef = useRef<any>(null);

  useEffect(() => {
    const ws = new WebSocket(import.meta.env.VITE_API_URL + "/ws");

    ws.onopen = () => {
      console.log("Connected to WebSocket server");
      sendUserRequest(ws);
    };

    ws.onmessage = (event) => {
      const response = JSON.parse(event.data);
      store.setSteps(response.steps);
      console.log(response.coins, "response.coins!!");
      if (response.coins !== undefined) {
        store.setCoins(response.coins);
        console.log(response.coins, "response.coins!!");
      }

      console.log("Received:", response);

      if (!isInitialized && response.result) {
        setIsInitialized(true);
        startStepsUpdateInterval(ws);
      }
    };

    ws.onclose = () => {
      console.log("Disconnected");
      stopStepsUpdateInterval();
    };

    ws.onerror = (error) => console.error("WebSocket error:", error);

    setSocket(ws);
    console.log(socket);

    return () => {
      ws.close();
      stopStepsUpdateInterval();
    };
  }, []);

  // Запуск интервала для отправки шагов
  const startStepsUpdateInterval = (ws: WebSocket) => {
    stopStepsUpdateInterval(); // Останавливаем предыдущий интервал, если был
    const timeInterval = Number(import.meta.env.VITE_TIME);
    intervalRef.current = setInterval(() => {
      console.log(store.start, "start!!");
      // console.log(isInitialized, "isInitialized!!");

      // if (isInitialized && store.start) {
      if (store.start) {
        sendStepsUpdate(ws);
      }
    }, timeInterval); // Каждые N секунд
  };

  // Остановка интервала
  const stopStepsUpdateInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const sendUserRequest = (ws: WebSocket) => {
    const message: WebSocketMessage = {
      endpoint: "user/info",
      payload: {
        id: store.user?.id || 0,
        firstName: store.user?.first_name || "firstName",
        languageCode: store.user?.language_code || "ru",
      },
    };

    ws.send(JSON.stringify(message));
  };

  const sendStepsUpdate = (ws: WebSocket) => {
    if (!store.start) {
      console.log("Steps update skipped - store.start is false");
      return;
    }

    const message: StepsUpdateMessage = {
      endpoint: "steps",
      payload: {
        id: store.user?.id || 0,
        steps: store.steps || 0,
      },
    };

    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(message));
      console.log("Steps update sent:", message);
    } else {
      console.log("Cannot send steps update - WebSocket not ready");
    }
  };

  // Останавливаем интервал при изменении store.start на false
  useEffect(() => {
    if (!store.start) {
      stopStepsUpdateInterval();
    }
  }, [store.start]);

  return null;
});

export default WebSocketComponent;
