import SockJS from 'sockjs-client/dist/sockjs';
import { Client } from '@stomp/stompjs';

export function createStompClient(onMessage) {
  const client = new Client({
    brokerURL: undefined, // fallback to SockJS
    webSocketFactory: () => new SockJS('/ws'),
    reconnectDelay: 5000,
    onConnect: () => {
      client.subscribe('/topic/public', (message) => {
        if (onMessage) onMessage(JSON.parse(message.body));
      });
    },
  });
  return client;
}
