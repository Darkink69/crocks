import SockJS from 'sockjs-client';
import { Client, IFrame } from '@stomp/stompjs';

let stompClient: Client | null = null;

export const connect = (onConnect: (arg0: Client | null) => any, onError: (arg0: IFrame) => any) => {
  console.log(import.meta.env.VITE_API_URL)
//   const url = import.meta.env.VITE_API_PRIVATE_DOMAIN
  const url = 'ws://94.228.125.251/ws'
  console.log(url, 'socket!')

  const socket = new SockJS(url);
  stompClient = new Client({
    webSocketFactory: () => socket,
    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
    onConnect: (frame) => {
      console.log('Connected: ' + frame);
      onConnect && onConnect(stompClient);
    },
    onStompError: (frame) => {
      console.error('Broker reported error: ' + frame.headers['message']);
      console.error('Additional details: ' + frame.body);
      onError && onError(frame);
    },
    onDisconnect: () => {
      console.log('Disconnected');
    }
  });

  stompClient.activate();
};

export const disconnect = () => {
  if (stompClient !== null) {
    stompClient.deactivate();
  }
  console.log("Disconnected");
};

export const sendMessage = (destination: any, body: any) => {
  if (stompClient && stompClient.connected) {
    stompClient.publish({
      destination: destination,
      body: JSON.stringify(body)
    });
  }
};

export const subscribe = (destination: string, callback: (arg0: any) => void) => {
  if (stompClient && stompClient.connected) {
    return stompClient.subscribe(destination, (message) => {
      callback(JSON.parse(message.body));
    });
  }
  return null;
};