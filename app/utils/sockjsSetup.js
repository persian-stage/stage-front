import SockJS from 'sockjs-client';
import { CompatClient, Stomp } from '@stomp/stompjs';

/**
 * Initialize a WebSocket connection using SockJS and STOMP.
 * @param {string} url - The WebSocket endpoint URL.
 * @param {function} onConnected - Callback function when connected to the server.
 * @param {function} onError - Callback function on connection error.
 * @param {number} [reconnectDelay] - Initial delay for reconnection attempts in milliseconds.
 * @returns {CompatClient} - The initialized STOMP client.
 */
export function initializeWebSocketConnection(url, onConnected, onError, onWebSocketClose) {
    let stompClient;

    const connect = () => {
        const socket = new SockJS(url);
        stompClient = Stomp.over(socket);

        stompClient.connect({}, () => {
            onConnected();
        }, (error) => {
            console.error('WebSocket connection error:', error);
            handleReconnection();
            if (onError) onError(error);
        });

        stompClient.onWebSocketClose = (event) => {
            console.warn('WebSocket connection closed:', event);
            onWebSocketClose(event);
        };

        stompClient.onWebSocketError = (event) => {
            console.error('WebSocket error:', event);
            handleReconnection();
        };
    };

    connect();

    return stompClient;
}

export const sendMessage = (client, message) => {
    if (client && client.connected) {
        client.send('/app/chat', {}, JSON.stringify(message));
    }
};
