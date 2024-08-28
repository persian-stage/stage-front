'use client';
import * as React from 'react';
import Grid from "@mui/material/Unstable_Grid2";
import UserList from "@/app/component/chat/UserList";
import ChatBox from "@/app/component/chat/ChatBox";
import { useSelector } from "react-redux";
import { RootState } from "@/app/state/store";
import { useEffect } from "react";
import { getUserDataWithId } from "@/app/services/apiService";
import Box from "@mui/material/Box";

export default function ChatWrapper({ initUserId }: { initUserId?: string }) {
    const { user, isUserLoggedIn } = useSelector((state: RootState) => state.auth);
    const [initUser, setInitUser] = React.useState(null);

    useEffect(() => {

        const getTargetUser = async () => {
            if (isUserLoggedIn && initUserId) {
                const userTarget: any = await getUserDataWithId(initUserId);
                console.log('User: ', userTarget);
                setInitUser(userTarget);
            }
        }
        getTargetUser();
    }, [isUserLoggedIn]);

    return (
        <Box>
            <Grid container rowSpacing={2} sx={{mt: 5, width: '100%', height: 800, borderColor: 'rgb(26,32,39)', borderRadius: 2, overflow: 'hidden' }} columnSpacing={{ xs: 0, sm: 1, md: 3 }}>
                {/*<ChatBoxHeader user={user} />*/}
                <UserList initUser={initUser} />
                <ChatBox initUser={initUser} />
            </Grid>
        </Box>
    );
};