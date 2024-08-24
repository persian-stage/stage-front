'use client';
import * as React from 'react';
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { Paper, Skeleton } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useSelector } from "react-redux";
import { RootState } from "@/app/state/store";
import Image from "next/image";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#916000' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(0),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function Chats() {
    const { user } = useSelector((state: RootState) => state.auth);

    return (
        <>
            <Grid container rowSpacing={2} sx={{mt: 5, width: '100%' }} columnSpacing={{ xs: 0, sm: 1, md: 3 }}>
                <Grid xs={12}  sm={12}
                    sx={{ display: { sm: 'flex', md: 'none'}, backgroundColor: '#9a9999', padding: 0, margin: 0}}
                    >

                    <Grid container >
                        <Grid xs={2}  sm={2}
                              sx={{ paddingTop: 1, margin: 0}}
                        >
                            <ChevronLeftIcon sx={{fontSize: 40}}/>
                        </Grid>
                        <Grid xs={2} sm={2}
                              sx={{ padding: 0, marginBottom: -1}}
                        >
                            {/*{user && user.avatar !== '' ?  user.avatar : 'ss'}*/}
                            { !!user && user.avatar === '' ?
                                <Skeleton animation="wave" variant="circular" width={ 40 } height={ 40 }/> :
                                <Image
                                width={ 60 }
                                height={ 60 }
                                    alt="Image"
                                    src={ 'https://stage-app-profiles-germany.s3.amazonaws.com/user/1703/avatar/thumbnail/20240823T200627Z_aa3d874823d54cb0802c22cb03dc6008.jpg' }
                                />
                            }
                        </Grid>
                        <Grid xs={6} sm={6}
                              sx={{ padding: 0, margin: 0}}>
                          3
                        </Grid>
                    </Grid>
                </Grid>

                <Grid  md={4}
                       sx={{ display: {xs: 'none', sm: 'none', md: 'flex'}, justifyContent: 'flex-end', backgroundColor: '#9a9999'}}
                >
                    Chats list 2
                </Grid>
                <Grid xs={12} sm={12} md={8} sx={{ height: 2000, backgroundColor: '#535353'}}>
                    <Typography variant="h3" component="h2" >
                        About me:
                    </Typography>
                </Grid>
            </Grid>
        </>
    );
}
