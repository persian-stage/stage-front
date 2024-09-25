'use client';
import * as React from 'react';
import { ImageList, ImageListItem, ImageListItemBar, Paper } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { styled, useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import Link from "next/link";
import { useMediaQuery } from "@mui/system";
import { useEffect, useState } from "react";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import IconButton from "@mui/material/IconButton";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from '@mui/icons-material/Delete';
import { AppDispatch, RootState } from "@/app/state/store";
import { getProfile, loadProfileImages, uploadImage } from "@/app/state/profileApp/profileAppSlice";
import { PATHS } from "@/app/constants/paths";
import Tooltip from "@mui/material/Tooltip";
import { deleteProfileImage } from "@/app/state/profileApp/profileAppSlice";

interface Props {
    profileId?: string;
    edit?: boolean;
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

export default function Profile({ profileId, edit }: Props) {
    const dispatch = useDispatch<AppDispatch>();
    const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.down('xs'));
    const isSm = useMediaQuery(theme.breakpoints.between('xs', 'sm'));
    const isMd = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    const isLg = useMediaQuery(theme.breakpoints.up('md'));
    const [imageListHeight, setImageListHeight] = useState(0);
    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const { user } = useSelector((state: RootState) => state.auth);
    const { profile }: any = useSelector((state: RootState) => state.profileApp);

    useEffect(() => {
        // TODO we should load total profile data and just images
        // dispatch(loadProfileImages(profileId ?? '0'));
        dispatch(getProfile(profileId ?? '0'));
    }, [dispatch, profileId]);

    const updatedItemData = React.useMemo(() => {
        return itemData.map((item: any, index) => ({
            ...item,
            img: profile.images[index]
                ? `https://stage-app-profiles-germany.s3.amazonaws.com/user/${profileId}/images/original/${profile.images[index]?.url}`
                : item.img,
            fileName: profile.images[index] ? profile.images[index]?.url : item.img,
            gender: profile.gender
        }));
    }, [profile?.images, user]);

    useEffect(() => {
        let height = 0;
        if (isXs) {
            height = 250;
        } else if (isSm) {
            height = 130;
        } else if (isMd) {
            height = 150;
        } else {
            height = 150;
        }
        setImageListHeight(height);
    }, [isXs, isSm, isMd, isLg]);

    const getCols = () => {
        if (isXs) return 1;
        if (isSm) return 1;
        if (isMd) return 2;
        return 4;
    };

    const filteredItemData = isMd || isSm || isXs ? [{ img: updatedItemData[0].img, title: updatedItemData[0].title, gender: updatedItemData[0].gender , cols: 2, rows: 0 }] : updatedItemData;

    const uploadImageHandler = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click(); // Trigger the file input dialog
        }
    };

    const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]; // Get the selected file
        if (file) {
            uploadFileToServer(file); // Call the upload function
        }
    };

    const uploadFileToServer = async (file: File) => {
        try {
            dispatch(uploadImage(file));
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    function handleDeleteImage(imgFileName: string) {
        if (profileId && imgFileName !== '') {
            dispatch(deleteProfileImage(profileId, imgFileName));
        }
    }

    return (
        <>
            <ImageList
                sx={{
                    maxWidth: '100%', // Ensure it doesn't overflow the container width
                    // maxHeight: '600px', // Ensure it doesn't overflow the container height
                    position: 'relative',
                    left: 0,
                    top: 0,
                    width: '100%',
                    height: { xs: 250, sm: 450, md: 550, lg: 600 },
                    overflow: 'hidden', // Prevent overflow
                    borderRadius: '8px',
                    boxShadow: '0px 0px 30px -10px rgba(255, 255, 255, 0.2)',
                }}
                cols={getCols()}
                gap={0}
            >
                {filteredItemData.map((item, index) => (
                    <ImageListItem
                        key={item.img}
                        cols={item.cols || 1}
                        rows={item.rows || 1}
                        sx={{
                            '&:hover .image-list-item-bar': {
                                display: 'flex',
                            },
                            height: '100%',
                            position: 'relative',
                            backgroundImage: `url(${item.img ? item.img : item.gender == 'male' ? '/img/profileAvatarMan.webp' : '/img/profileAvatarWomen.webp'})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                        }}
                    >
                            {/* You can keep the ImageListItemBar for actions */}
                            {!item.img && user && user.id + '' === profileId && (
                                <ImageListItemBar
                                    className="image-list-item-bar"
                                    sx={{
                                        background: 'transparent',
                                        display: 'none',
                                        cursor: 'pointer',
                                    }}
                                    title="Upload Image"
                                    position="top"
                                    actionIcon={
                                        <IconButton sx={{ color: 'white' }} aria-label={`star ${item.title}`}>
                                            <AddPhotoAlternateIcon sx={{ fontSize: 70, color: 'white' }} />
                                        </IconButton>
                                    }
                                    actionPosition="left"
                                    onClick={uploadImageHandler}
                                />
                            )}
                        {item.img && user && user.id + '' === profileId && (<Tooltip
                            title="Delete"
                            sx={{
                                position: 'absolute',
                                bottom: 0,
                                right: 0,
                            }}
                        >
                            <IconButton onClick={() => {
                                handleDeleteImage(item.fileName);
                            }}>
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>)}
                    </ImageListItem>
                ))}
            </ImageList>
            <Grid container rowSpacing={2} sx={{ mt: `${imageListHeight}px` }}
                  columnSpacing={{ xs: 0, sm: 1, md: 3 }}>
                {profileId &&
                    <Grid xs={12} sm={12} md={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Link href={PATHS.CHATS + profileId} style={{ textDecoration: 'none', color: "#fff" }}>
                            <Button variant="contained" endIcon={<ChatBubbleOutlineIcon />}>
                                Chat
                            </Button>
                        </Link>
                    </Grid>}
                <Grid xs={12} sm={6} md={4} sx={{ height: 500 }}>
                    <Typography variant="h3" component="h2">
                        About me:
                    </Typography>
                </Grid>
            </Grid>
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                accept="image/*"
                onChange={onFileChange}
            />
        </>
    );
};

const itemData = [
    {
        title: 'Breakfast',
        rows: 2,
        cols: 2,
    },
    {
        title: 'Burger',
        rows: 1,
        cols: 1,
    },
    {
        title: 'Camera',
        rows: 1,
        cols: 1,
    },
    {
        title: 'Camera',
        rows: 1,
        cols: 1,
    },
    {
        title: 'Camera',
        rows: 1,
        cols: 1,
    },
];