'use client';
import * as React from 'react';
import { ImageList, ImageListItem, Paper } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { PATHS } from "@/app/constants/paths";
import Link from "next/link";


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
    return (
        <>
            <ImageList
                sx={{
                    position: 'relative',
                    left: 0,
                    width: '100%',
                    height: 650,
                    overflowY: 'scroll',
                    borderRadius: '8px',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    boxShadow: '0px 0px 30px -10px rgba(255, 255, 255, 0.2)',
                }}
                variant="quilted"
                cols={5}
                rowHeight={200}
            >
                {itemData.map((item) => (
                    <ImageListItem key={item.img} cols={item.cols || 1} rows={item.rows || 1}>
                        <img
                            {...srcset(item.img, 121, item.rows, item.cols)}
                            alt={item.title}
                            loading="lazy"
                        />
                    </ImageListItem>
                ))}
            </ImageList>
            <Grid container rowSpacing={2} sx={{mt: 5 }} columnSpacing={{ xs: 0, sm: 1, md: 3 }}>
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
    },
    {
        img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
        title: 'Camera',
    },
    {
        img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
        title: 'Coffee',
        cols: 2,
    },
    {
        img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
        title: 'Hats',
        cols: 2,
    },
    {
        img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
        title: 'Honey',
        author: '@arwinneil',
        rows: 3,
        cols: 2,
    },
    {
        img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
        title: 'Basketball',
    },
    {
        img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
        title: 'Fern',
    },
    {
        img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
        title: 'Mushrooms',
        rows: 2,
        cols: 2,
    },
    {
        img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
        title: 'Tomato basil',
    },
    {
        img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
        title: 'Sea star',
    },
    {
        img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
        title: 'Bike',
        cols: 2,
    },
];