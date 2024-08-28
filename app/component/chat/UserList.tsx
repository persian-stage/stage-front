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

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    maxWidth: 400,
    ...theme.applyStyles('dark', {
        backgroundColor: '#1A2027',
    }),
    borderTopLeftRadius: 0,
}));

const message = `Truncation should be conditionally applicable on this long line of text
 as this is a much longer line than what the container can support.`;

export default function UserList({ initUser }: { initUser: any }) {

    return (
        <>
            <Grid  md={4}
                   sx={{
                       display: {xs: 'none', sm: 'none', md: 'flex'},
                       padding:0,
                       justifyContent: 'flex-end',
                       backgroundColor: '#9a9999',
                       // backgroundImage: 'url(/path/to/your/image.jpg)',
                       // backgroundSize: 'cover',
                       // backgroundPosition: 'center',
                       // backgroundRepeat: 'no-repeat',
            }}
            >
                <Box sx={{ flexGrow: 1, overflow: 'hidden', px: 0, margin:0, backgroundColor: '#cfcfcf' }}>
                    {initUser && <><Item sx={{ my: 0, mx: 'auto', p: 2 }}>
                        <Stack spacing={2} direction="row" sx={{ alignItems: 'center' }}>
                            <Avatar src={`https://stage-app-profiles-germany.s3.amazonaws.com/user/${initUser.id}/avatar/thumbnail/${ initUser.avatar }`} />
                            <Typography noWrap>{initUser.firstname + ' ' + initUser.lastname}</Typography>
                        </Stack>
                    </Item>
                    <Divider /></>}
                    <Item sx={{ my: 0, mx: 'auto', p: 2 }}>
                        <Stack spacing={2} direction="row" sx={{ alignItems: 'center' }}>
                            <Stack>
                                <Avatar>W</Avatar>
                            </Stack>
                            <Stack sx={{ minWidth: 0 }}>
                                <Typography noWrap>{message}</Typography>
                            </Stack>
                        </Stack>
                    </Item>
                </Box>
            </Grid>
        </>
    );
};