'use client';
import * as React from 'react';
import Grid from "@mui/material/Unstable_Grid2";
import UserList from "@/app/component/chat/UserList";
import ChatBox from "@/app/component/chat/ChatBox";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/state/store";
import { useEffect } from "react";
import { fetchChatHistoryList, getUserDataWithId } from "@/app/services/apiService";
import { setIsNewMessage } from "@/app/state/commonSlice";
import { useWebSocket } from "@/app/context/WebSocketContext";

export default function ChatWrapper({ initUserId }: { initUserId?: string }) {
    const dispatch = useDispatch<AppDispatch>();
    const { user, isUserLoggedIn } = useSelector((state: RootState) => state.auth);
    const [initUser, setInitUser] = React.useState(null);
    const [ chatHistorySelectedIds, setChatHistorySelectedIds ] = React.useState<any>(null);
    const { isNewMessage } = useSelector((state: RootState) => state.common);
    const [chatHistoryList, setChatHistoryList] = React.useState<any[] | null>(null);
    const { messages} = useWebSocket();

    useEffect(() => {
        const chatHistorys = async () => {
            const response = await fetchChatHistoryList();

            if (!response)
                return;

            setChatHistoryList(response);

            if (response.length > 0) {
                setChatHistorySelectedIds({ chatId: response[0].chatId, userId: response[0].recipientId === user?.id + '' ? response[0].senderId : response[0].recipientId });
            }

        }

        if (chatHistoryList === null) {
            chatHistorys();
        }

    }, [chatHistoryList]);

    useEffect(() => {
        if (chatHistoryList === null) return;

        let shouldUpdate = false;

        const updatedChatHistoryList = chatHistoryList.map((chat: any) => {
            if (!chat) return chat;

            const senderId = chat.senderId === user?.id + '' ? chat.recipientId : chat.senderId;

            const relevantMessage = messages.find((message: any) => message.sender === senderId && message.sender !== user?.id);

            if (relevantMessage && chatHistorySelectedIds?.userId !== senderId) {
                shouldUpdate = true;

                if (chat.unreadMessageNum === undefined) {
                    return { ...chat, unreadMessageNum: 1 };
                } else {
                    return { ...chat, unreadMessageNum: chat.unreadMessageNum + 1 };
                }
            }

            return chat;
        });

        if (shouldUpdate) {
            setChatHistoryList(updatedChatHistoryList);
        }

    }, [messages, user?.id]);


    useEffect(() => {


        dispatch(setIsNewMessage(false))


        if (chatHistoryList === null || !isUserLoggedIn || !initUserId)
            return;

        const isUserChatHistory = chatHistoryList && chatHistoryList.some((chatHistory: any) => chatHistory.chatId.includes(initUserId +''));

        const getTargetUser = async () => {

            if (isUserLoggedIn && initUserId) {
                const userTarget: any = await getUserDataWithId(initUserId);
                setInitUser(userTarget);
            }
        }
        !isUserChatHistory && getTargetUser();

    }, [isUserLoggedIn, chatHistoryList, initUserId]);

    function handleChatSelect(chatId: string, userId: string) {
        setChatHistorySelectedIds({ chatId: chatId, userId: userId });

        if (chatHistoryList === null) return;

        let shouldUpdate = false;

        const updatedChatHistoryList = chatHistoryList.map((chat: any) => {
            if (!chat) return chat;

            if (chat.chatId === chatId) {
                if (chat.unreadMessageNum !== undefined) {
                    shouldUpdate = true;
                    return { ...chat, unreadMessageNum: 0 };
                }
            }

            return chat;
        });

        if (shouldUpdate) {
            setChatHistoryList(updatedChatHistoryList);
        }
    }

    return (
        <Grid container rowSpacing={2} sx={{mt: 5, width: '100%' }} columnSpacing={{ xs: 0, sm: 1, md: 3 }}>
            {/*<ChatBoxHeader user={user} />*/}
            <UserList initUser={initUser} setChatHistorySelectedIds={setChatHistorySelectedIds} chatHistoryList={chatHistoryList} handleChatSelect={handleChatSelect} />
            <ChatBox initUser={initUser} chatHistorySelectedIds={chatHistorySelectedIds} />
        </Grid>
    );
};