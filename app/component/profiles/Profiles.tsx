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
import { setLoading } from "@/app/state/generalSlice";


const profiles = [
    {}
];

export default function Profiles() {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const { isProfileAppRegistered } = useSelector((state: RootState) => state.profileApp);
    const { reTry } = useSelector((state: RootState) => state.network);
    const loading = useSelector((state: RootState) => state.general.loading);

    useEffect(() => {
        if (!isProfileAppRegistered) {
            router.push(PATHS.PROFILES + '/register');
        }
    }, [ isProfileAppRegistered, router, dispatch ]);

    useEffect(() => {
        dispatch(setLoading(true));
    }, []);

    return (
        <Grid container rowSpacing={ 2 } sx={ { marginTop: 20} }>
            { !reTry ? (loading ? Array.from(new Array(3)) : profiles).map((item, index) => (
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
                            <Box sx={ { pr: 2 } }>
                                <Typography gutterBottom variant="body2">
                                    { item.title }
                                </Typography>
                                <Typography display="block" variant="caption" color="text.secondary">
                                    { item.channel }
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    { `${ item.views } • ${ item.createdAt }` }
                                </Typography>
                            </Box>
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