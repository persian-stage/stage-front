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

export default function ChatBox({ initUser }: { initUser: null | any }) {
    const [inputValue, setInputValue] = useState('');
    const [inputDirection, setInputDirection] = useState('ltr');
    const { client, messages, setMessages } = useWebSocket();
    const { user } = useSelector((state: RootState) => state.auth);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    const handleSendMessage = () => {
        console.log('Sending message:', inputValue);
        console.log('client:', client);
        if (client) {
            const chatMessage = {
                senderId: user && user.id + '',
                recipientId: initUser && initUser.id + '',
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
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    return (
        <Grid
            xs={12}
            sm={12}
            md={8}
            sx={{
                backgroundColor: '#e3e3e3',
                padding: 1,
                borderRadius: 1,
                position: 'relative',
            }}
        >
            <Box sx={ {
                overflow: 'scroll',
                height: 700,
                width: '100%',
                position: 'relative',
                maskImage: 'linear-gradient(to bottom, transparent, black 3%, white 95%, transparent)',
                '-webkit-mask-image': 'linear-gradient(to bottom, transparent, black 3%, black 95%, transparent)'
            } }>
                { messages.map((message) => (
                    <MessageContainer key={ message.id } sx={ { color: '#000000' } }>
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
                <div ref={ messagesEndRef }/>
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
    );
};
