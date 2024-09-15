'use client';
import * as React from 'react';
import { ImageList, ImageListItem, Paper } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { styled, useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { PATHS } from "@/app/constants/paths";
import Link from "next/link";
import { useMediaQuery } from "@mui/system";
import { useEffect, useState } from "react";


interface Props {
    profileId: string;
}

function srcset(image: string, size: number, rows = 1, cols = 1) {
    return {
        src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
        srcSet: `${image}?w=${size * cols}&h=${
            size * rows
        }&fit=crop&auto=format&dpr=2 2x`,
    };
}

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#4e4e4e' : '#fff',
    ...theme.typography.subtitle1,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
}));

export default function Profile({ profileId }: Props) {
    const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.down('xs'));
    const isSm = useMediaQuery(theme.breakpoints.between('xs', 'sm'));
    const isMd = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    const isLg = useMediaQuery(theme.breakpoints.up('md'));
    const [imageListHeight, setImageListHeight] = useState(0);

    useEffect(() => {
        let height = 0;
        if (isXs) {
            height = 250;
        } else if (isSm) {
            height = 330;
        } else if (isMd) {
            height = 550;
        } else {
            height = 750;
        }
        setImageListHeight(height); // Update state with the height
    }, [isXs, isSm, isMd, isLg]);

    // Set columns based on screen size
    const getCols = () => {
        if (isXs) return 1;
        if (isSm) return 1;
        if (isMd) return 2;
        return 4;
    };

    const filteredItemData = isSm ? [{img: itemData[0].img, title: itemData[0].title, cols: 2, rows: 0}] : itemData;

    return (
        <>
            <ImageList
                sx={{
                    position: 'relative',
                    left: 0,
                    top: 50,
                    width: '100%',
                    height: {xs: 250, sm: 450, md: 550, lg: 600},
                    overflowY: 'hidden',
                    overflowX: 'hidden',
                    transition: '0.5s',
                    borderRadius: '8px',
                    boxShadow: '0px 0px 30px -10px rgba(255, 255, 255, 0.2)',
                }}
                cols={getCols()}
                gap={0}
            >
                {filteredItemData.map((item) => (
                    <ImageListItem key={item.img}
                                   cols={item.cols || 1}
                                   rows={item.rows || 1}
                    >
                        <Link href='#' style={{ display: 'flex', margin: 0, padding: 0, height: '100%' }}>
                            <img
                                { ...srcset(item.img, 500, item.rows, item.cols) }
                                alt={ item.title }
                                loading="lazy"
                                style={{ width: '100%' }}
                            />
                        </Link>
                    </ImageListItem>
                )) }
            </ImageList>
            <Grid container rowSpacing={ 2 } sx={{ mt: `${imageListHeight}px` }} columnSpacing={ { xs: 0, sm: 1, md: 3 }}>
                <Grid xs={12} sm={12} md={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Link href={ PATHS.CHATS + profileId } style={{ textDecoration: 'none', color: "#fff" }}>
                        <Button variant="contained" endIcon={<ChatBubbleOutlineIcon />}>
                            Chat
                        </Button>
                    </Link>
                </Grid>
                <Grid xs={12} sm={6} md={4} sx={{ height: 500}}>
                    <Typography variant="h3" component="h2" >
                        About me:
                    </Typography>
                </Grid>
            </Grid>
        </>
    );
};

const itemData = [
    {
        img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
        title: 'Breakfast',
        rows: 2,
        cols: 2,
    },
    {
        img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
        title: 'Burger',
        rows: 1,
        cols: 1,
    },
    {
        img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
        title: 'Camera',
        rows: 1,
        cols: 1,
    },
    {
        img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
        title: 'Camera',
        rows: 1,
        cols: 1,
    },
    {
        img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
        title: 'Camera',
        rows: 1,
        cols: 1,
    },



];