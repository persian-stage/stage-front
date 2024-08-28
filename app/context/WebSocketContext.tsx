'use client';
import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { initializeWebSocketConnection } from '@/app/utils/sockjsSetup';
import { useSelector } from "react-redux";
import { RootState } from "@/app/state/store";

interface WebSocketContextType {
    client: any;
    messages: any[];
    setMessages: React.Dispatch<React.SetStateAction<any[]>>;
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [client, setClient] = useState<any | null>(null);
    const ClientRef = useRef<any | null>(null);
    const [messages, setMessages] = useState<any[]>([]);
    const { user } = useSelector((state: RootState) => state.auth);

    useEffect(() => {

        if (user === null) {
            return;
        }

        const onConnected = () => {
            if (ClientRef.current) {
                ClientRef.current.subscribe(`/user/${ user && user.id }/queue/messages`, function (message: any) {
                    const messageContent = JSON.parse(message.body);
                    setMessages(prevMessages => [...prevMessages, {id: messageContent.id, sender: messageContent.senderId, recipientId: messageContent.recipientId, content: messageContent.content}]);
                });
            }
        };

        const onError = (error: any) => {
            console.error('WebSocket connection error:', error);
        };


        if (ClientRef.current === null) {
            const wsClient = initializeWebSocketConnection('/ws', onConnected, onError);
            setClient(wsClient);
            ClientRef.current = wsClient;
        }

        // TODO there is a bug here
        // return () => {
        //     if (ClientRef.current) {
        //         ClientRef.current.deactivate();
        //     }
        // };
    }, [user]);

    return (
        <WebSocketContext.Provider value={{ client, messages, setMessages }}>
            {children}
        </WebSocketContext.Provider>
    );
};

export const useWebSocket = () => {
    const context = useContext(WebSocketContext);
    if (context === undefined) {
        throw new Error('useWebSocket must be used within a WebSocketProvider');
    }
    return context;
};
