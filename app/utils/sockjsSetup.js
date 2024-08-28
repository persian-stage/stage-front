import SockJS from 'sockjs-client';
import { CompatClient, Stomp } from '@stomp/stompjs';

/**
 * Initialize a WebSocket connection using SockJS and STOMP.
 * @param {string} url - The WebSocket endpoint URL.
 * @param {function} onConnected - Callback function when connected to the server.
 * @param {function} onError - Callback function on connection error.
 * @returns {CompatClient} - The initialized STOMP client.
 */
export function initializeWebSocketConnection(url, onConnected, onError) {

    const socket = new SockJS(url);

    const stompClient = Stomp.over(socket);

    stompClient.connect({}, onConnected, onError);

    stompClient.onWebSocketClose = (event) => {};

    stompClient.onWebSocketError = (event) => {};

    return stompClient;
}

export const sendMessage = (client, message) => {
    if (client && client.connected) {
        client.send('/app/chat', {}, JSON.stringify(message));
    }
};
