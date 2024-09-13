'use client';
import * as React from 'react';
import Grid from "@mui/material/Unstable_Grid2";
import { Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import {useSelector } from "react-redux";
import { RootState } from "@/app/state/store";
import CardActionArea from "@mui/material/CardActionArea";
import Badge from "@mui/material/Badge";

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: 'center',
    ...theme.applyStyles('dark', {
        backgroundColor: '#1A2027',
    }),
    borderRadius: 0,
    padding: 15,
    '&:hover': {
        cursor: 'pointer',
    }
}));

export default function UserList({ initUser, chatHistoryList, handleChatSelect }: { initUser: any; chatHistoryList: any[] | null, handleChatSelect: any }) {
    const { user } = useSelector((state: RootState) => state.auth);
    const state = useSelector((state: RootState) => state);

    return (
        <>
            <Grid  md={4}
                   sx={{
                       display: {
                           xs: 'flex',
                           sm: 'flex',
                           md: 'flex'
                       },
                       padding:0,
                       justifyContent: 'flex-end',
                       maxHeight: 800
            }}
            >
                <Box sx={{ flexGrow: 1, overflow: 'scroll', backgroundColor: '#22262c', overflowX: 'hidden' }}>
                    {initUser && <>
                        <CardActionArea>
                            <Item>
                                <Stack spacing={2} direction="row" sx={{ alignItems: 'center' }}>
                                    <Avatar src={`https://stage-app-profiles-germany.s3.amazonaws.com/user/${initUser.id}/avatar/thumbnail/${ initUser.avatar }`} />
                                    <Typography noWrap>{initUser.firstname + ' ' + initUser.lastname}</Typography>
                                </Stack>
                            </Item>
                        </CardActionArea>
                        <Divider />
                    </>}
                    {user && chatHistoryList && chatHistoryList.length > 0 && chatHistoryList.map((chat: any) => (
                        <React.Fragment key={chat.chatId}>
                            <CardActionArea>
                                <Item onClick={e => (handleChatSelect(chat.chatId, chat.recipientId == user.id ? chat.senderId : chat.recipientId))}>
                                    <Stack spacing={2} direction="row" sx={{ alignItems: 'center' }}>
                                        <Badge badgeContent={chat?.unreadMessageNum ?? 0} color="primary">
                                            <Avatar src={`https://stage-app-profiles-germany.s3.amazonaws.com/user/${chat.recipientId == user.id ? chat.senderId + '/avatar/thumbnail/' + chat.senderAvatar : chat.recipientId + '/avatar/thumbnail/' + chat.recipientAvatar}`} />
                                        </Badge>
                                        <Typography noWrap>{chat.recipientId == user.id ? chat.senderFirstname + ' ' + chat.senderLastname : chat.recipientFirstname + ' ' + chat.recipientLastname}</Typography>
                                    </Stack>
                                </Item>
                            </CardActionArea>
                            <Divider />
                        </React.Fragment>
                    ))}
                    <CardActionArea>
                        <Item onClick={e => (handleChatSelect('0', '0'))}>
                            <Stack spacing={2} direction="row" sx={{ alignItems: 'center' }}>
                                <Avatar src={``} >PS</Avatar>
                                <Typography noWrap>Persian Stage</Typography>
                            </Stack>
                        </Item>
                    </CardActionArea>
                </Box>
            </Grid>
        </>
    );
};