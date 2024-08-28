import { Client } from '@stomp/stompjs';

interface ChatMessage {
    senderId: string;
    recipientId: string;
    content: string;
    timestamp: Date;
}

export const initializeWebSocketConnection = (
    url: string,
    onConnected: () => void,
    onError: (error: any) => void
): Client => {
    const client = new Client({
        brokerURL: url,
        onConnect: () => {
            onConnected();
        },
        onStompError: (error) => {
            onError(error);
        }
    });

    client.activate();
    return client;
};

export const sendMessage = (client: Client, message: ChatMessage) => {
    if (client && client.connected) {
        client.publish({
            destination: '/app/chat',
            body: JSON.stringify(message),
        });
    }
};