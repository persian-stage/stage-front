'use client';
import * as React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import Image from "next/image";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CachedIcon from "@mui/icons-material/Cached";
import { setReTry } from '@/app/state/networkSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/state/store';
import { PATHS } from "@/app/constants/paths";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import { CardActions } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MessageIcon from '@mui/icons-material/Message';
import Link from "next/link";
import { getProfileCards } from "@/app/state/profileApp/profileCardsSlice";

function isImageLoadable(url: string): Promise<boolean> {
    return new Promise((resolve) => {
        // @ts-ignore
        const img: HTMLImageElement = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = url;
    });
}

export default function ProfileCards() {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const { isProfileAppRegistered } = useSelector((state: RootState) => state.profileApp);
    const { reTry } = useSelector((state: RootState) => state.network);
    const { profileCards } = useSelector((state: RootState) => state.profileCards);
    const loading = useSelector((state: RootState) => state.common.loading);

    useEffect(() => {
        // TODO Get User data from the server and update isProfileAppRegistered
        if (!isProfileAppRegistered) {
            router.push(PATHS.PROFILES + '/register');
        }
        dispatch(getProfileCards());
    }, [ isProfileAppRegistered, router, dispatch ]);

    return (
        <Grid container rowSpacing={ 2 } sx={ { marginTop: 20} }>
            { !reTry ? (loading && profileCards.length === 0 ? Array.from(new Array(3)) : profileCards).map((item, index) => (
                <Grid key={ index } xs={ 12 } sm={ 6 } md={ 4 }>
                    <Box key={ index } sx={ { my: 5, mx: 3 } }>
                        { item ? (
                            <Image
                                style={ { height: 0 } }
                                layout="fill"
                                alt={ item.title }
                                src={ item.src }
                            />
                        ) : (
                            <Skeleton variant="rectangular" style={ { borderRadius: 5 } } height={ 118 }/>
                        ) }
                        { item ? (
                            <Card sx={{ maxWidth: {sm:500, md: 477} }}>
                                <Link href={ PATHS.PROFILE + item.user.id } style={{ textDecoration: 'none', color: "#fff" }}>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            height="250"
                                            onError={() => {
                                                console.log('Image not found');
                                            }}
                                            image={item.mediumImage.includes('.jpg') ? `${item.mediumImage}` : item.user.gender == 'male' ? '/img/profileAvatarMan.webp' : '/img/profileAvatarWomen.webp'}
                                            alt="green iguana"
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                                { item.user.firstname } { item.user.lastname }
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                { item.user.city }, { item.user.country }
                                            </Typography>

                                        </CardContent>
                                    </CardActionArea>
                                </Link>
                                <CardActions sx={{ marginTop: 1, mb: 1, justifyContent: 'flex-end' }}>
                                    <IconButton aria-label="add to favorites">
                                    </IconButton>
                                    <IconButton aria-label="add to favorites">
                                    </IconButton>
                                    <IconButton aria-label="add to favorites">
                                    </IconButton>
                                    <IconButton sx={{}} aria-label="add to favorites">
                                        {/*<FavoriteIcon sx={{color: '#da1359', fontSize: 45}}/>*/}
                                    </IconButton>
                                    <IconButton aria-label="add to favorites">
                                        <MessageIcon sx={{color: '#fff', fontSize: 30}}/>
                                    </IconButton>
                                </CardActions>
                            </Card>
                        ) : (
                            <Box sx={ { pt: 0.5 } }>
                                <Skeleton/>
                                <Skeleton width="60%"/>
                            </Box>
                        ) }
                    </Box>
                </Grid>
            )) : <Box
                sx={ {
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    height: '100vh'
                } }
            >
                <Button variant="contained" startIcon={ <CachedIcon/> } onClick={ () => {
                    dispatch(setReTry(false));
                } }>
                    Please Try Again
                </Button>
            </Box> }
        </Grid>
    );
}