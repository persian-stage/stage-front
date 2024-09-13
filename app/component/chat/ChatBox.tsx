'use client';
import * as React from 'react';
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import SendIcon from '@mui/icons-material/Send'
import { useEffect, useRef, useState } from "react";
import { sendMessage } from '@/app/utils/sockjsSetup';
import { useWebSocket } from "@/app/context/WebSocketContext";
import { useSelector } from "react-redux";
import { RootState } from "@/app/state/store";

const MessageContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    margin: theme.spacing(1, 0),
}));

const MyMessage = styled(Box)(({ theme }) => ({
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6',
    marginTop:10,
    padding: theme.spacing(1),
    borderRadius: 10,
    maxWidth: '60%',
    position: 'relative',
    '&::after': {
        content: '""',
        position: 'absolute',
        bottom: -20,
        right: 10,
        width: 0,
        height: 0,
        border: '10px solid transparent',
        borderTopColor: '#DCF8C6',
        borderRight: 0,
        marginLeft: '-5px',
    }
}));

const TheirMessage = styled(Box)(({ theme }) => ({
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
    marginTop:10,
    padding: theme.spacing(1),
    borderRadius: 10,
    maxWidth: '60%',
    position: 'relative',
    '&::before': {
        content: '""',
        position: 'absolute',
        bottom: -20,
        left: 10,
        width: 0,
        height: 0,
        border: '10px solid transparent',
        borderTopColor: '#FFFFFF',
        borderLeft: 0,
        marginRight: '0px',
    }
}));

export default function ChatBox({ initUser, chatHistorySelectedIds }: { initUser: null | any; chatHistorySelectedIds: null | any }) {
    const [inputValue, setInputValue] = useState('');
    const [inputDirection, setInputDirection] = useState('ltr');
    const { client, messages, setMessages } = useWebSocket();
    const { user } = useSelector((state: RootState) => state.auth);
    const lastMessageRef = useRef<HTMLDivElement | null>(null);
    const scrollContainerRef = useRef<HTMLDivElement | null>(null);
    const [ chatBoxMessages, setChatBoxMessages ] = useState<any[]>([]);

    const recipientId = initUser ? initUser.id + '' : chatHistorySelectedIds && chatHistorySelectedIds.userId ? chatHistorySelectedIds.userId : '0';

    const handleSendMessage = () => {
        if (client) {
            const chatMessage = {
                senderId: user ? user.id + '' : '0',
                recipientId: recipientId,
                content: inputValue,
                timestamp: new Date(),
            };
            sendMessage(client, chatMessage);
            setMessages(prevMessages => [...prevMessages, {id: 0, sender: chatMessage.senderId, recipientId: chatMessage.recipientId, content: chatMessage.content}]);
            setInputValue('');
        }
    }

    const isFarsiText = (text: string) => {
        const farsiRegex = /[\u0600-\u06FF]/; // Regex for Farsi characters
        return farsiRegex.test(text);
    };

    const handleInputChange = (event: { target: { value: any; }; }) => {
        const value = event.target.value;
        setInputValue(value);

        if (isFarsiText(value)) {
            setInputDirection('rtl');
        } else {
            setInputDirection('ltr');
        }
    };

    useEffect(() => {

        const filteredMessages = messages.filter(
            (message) => message.sender === recipientId || message.recipientId === recipientId
        );

        if (filteredMessages.length > 0) {

        }
        setChatBoxMessages(filteredMessages);

    }, [messages, recipientId]);

    useEffect(() => {
        if (lastMessageRef.current && scrollContainerRef.current) {
            scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
        }
    }, [chatBoxMessages]);

    return (
        <>
            {initUser || chatHistorySelectedIds ? (
                <Grid
                    xs={12}
                    sm={8}
                    md={8}
                    sx={{
                        backgroundColor: '#e3e3e3',
                        padding: 1,
                        position: 'relative',
                    }}
                >
                    <Box ref={scrollContainerRef}
                         sx={ {
                        overflow: 'scroll',
                        height: 400,
                        width: '100%',
                        position: 'relative',
                        marginBottom: 10,
                        maskImage: 'linear-gradient(to bottom, transparent, black 3%, white 95%, transparent)',
                        '-webkit-mask-image': 'linear-gradient(to bottom, transparent, black 3%, black 95%, transparent)'
                    } }>
                        { chatBoxMessages.map((message, index) => (
                            <MessageContainer key={ message.id } sx={ { color: '#000000' } }
                              ref={index === chatBoxMessages.length - 1 ? lastMessageRef : null}
                            >
                                { user && message.sender === user.id + '' ? (
                                    <MyMessage>
                                        <Typography sx={ {
                                            direction: isFarsiText(message.content) ? 'rtl' : 'ltr',
                                            textAlign: isFarsiText(message.content) ? 'right' : 'left',
                                        } }>{ message.content }</Typography>
                                    </MyMessage>
                                ) : (
                                    <TheirMessage sx={ {
                                        direction: isFarsiText(message.content) ? 'rtl' : 'ltr',
                                        textAlign: isFarsiText(message.content) ? 'right' : 'left',
                                    } }>
                                        <Typography>{ message.content }</Typography>
                                    </TheirMessage>
                                ) }
                            </MessageContainer>
                        )) }
                        { chatHistorySelectedIds && chatHistorySelectedIds.userId === '0' && chatHistorySelectedIds.chatId === '0' &&
                            <Typography sx={{
                                color: '#000000',
                                marginTop: 3,
                                backgroundColor: '#ffffff',
                                borderRadius: 5,
                                padding: 3,
                                position: 'relative'
                            }}>
                                Welcome to Stage Community! 🎉
                                <br/><br/>
                                We&apos;re excited to have you here! To make the best out of your experience and connect
                                positively with others, remember to:
                                <br/><br/>
                                Be respectful: Treat everyone with kindness and courtesy.
                                <br/>
                                Be genuine: Honesty goes a long way in building meaningful connections.
                                <br/>
                                Communicate clearly: Avoid misunderstandings by being open and clear.
                                <br/><br/>
                                Respect boundaries: If someone is not interested or uncomfortable, be mindful and
                                respectful of their space.
                                Let&apos;s create a fun and friendly environment for everyone! Happy connecting!
                                🌟</Typography>}
                    </Box>
                    <TextField
                        id="outlined-multiline-flexible"
                        value={inputValue}
                        onChange={handleInputChange}
                        multiline
                        maxRows={4}
                        sx={{
                            width: 'calc(100% - 20px)',
                            bottom: 0,
                            left: 10,
                            position: 'absolute',
                            marginBottom: 2,
                            backgroundColor: '#3a3a3a',
                            borderRadius: 2,
                            paddingRight: 15,
                            borderColor: 'transparent',
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: 'transparent',
                                },
                                '&:hover fieldset': {
                                    borderColor: 'transparent',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: 'transparent',
                                    borderWidth: 0,
                                },
                            },
                        }}
                        inputProps={{ dir: inputDirection }}
                    />
                    <Button
                        onClick={() => {handleSendMessage()}}
                        sx={{
                            right: 30,
                            bottom: 25,
                            position: 'absolute',
                        }} variant="contained" endIcon={<SendIcon />}>
                        Send
                    </Button>
                </Grid>
            ) : (
                <Grid
                    xs={12}
                    sm={12}
                    md={8}
                    sx={{
                        backgroundColor: '#e3e3e3',
                        padding: 1,
                        position: 'relative',
                        height: 700,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        color: '#000000',
                    }}
                >
                    <Typography>Please select a user to chat</Typography>
                </Grid>
            )}
        </>
    );
};
