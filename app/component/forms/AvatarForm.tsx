'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Button, Stack, Box } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LoadingButton from '@mui/lab/LoadingButton';
import { AppDispatch, RootState } from "@/app/state/store";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/app/state/commonSlice";
import { setAvatar, uploadAvatar } from "@/app/state/registerSlice";

const AvatarForm = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [avatarState, setAvatarState] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [initialPosition, setInitialPosition] = useState({ x: 0, y: 0 });
    const [dragging, setDragging] = useState(false);
    const [animate, setAnimate] = useState(false);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const { loading } = useSelector((state: RootState) => state.common);

    const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (file && file.size > MAX_FILE_SIZE) {
            // TODO notify in UI
            alert('File size exceeds the maximum limit of 50MB.');
            return;
        }
        setAvatarState(file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
                setAnimate(true);
                setTimeout(() => {
                    setAnimate(false);
                }, 500);
            };
            reader.readAsDataURL(file);
        } else {
            setPreview(null);
        }
    };

    const submitAvatarForm = (avatar: File) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const url = reader.result as string;
            dispatch(setAvatar({ name: avatar.name, url }));
            dispatch(uploadAvatar(avatar));
        };
        reader.readAsDataURL(avatar);
    };

    const handleSubmit = () => {
        dispatch(setLoading(true));
        if (avatarState) {
            submitAvatarForm(avatarState);
        }
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        if (loading) {
            return;
        }
        setDragging(true);
        setInitialPosition({ x: e.clientX - position.x, y: e.clientY - position.y });
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (dragging) {
            setPosition({
                x: e.clientX - initialPosition.x,
                y: e.clientY - initialPosition.y,
            });
        }
    };

    const handleMouseUp = () => {
        setDragging(false);
    };

    const handleChangeImage = () => {
        fileInputRef.current?.click();
    };

    return (
        <form id="avatar-form">
            <Stack spacing={ 2 } direction="column" alignItems="center">
                <h2 id="parent-modal-title">Upload Avatar</h2>
                <br/>
                <Box
                    component="div"
                    sx={ {
                        width: 200,
                        height: 200,
                        borderRadius: '50%',
                        backgroundImage: preview ? `url(${ preview })` : 'none',
                        backgroundSize: 'cover',
                        backgroundPosition: `${ position.x }px ${ position.y }px`,
                        border: '1px solid #ccc',
                        boxShadow: '0px 0px 30px -10px rgba(255, 255, 255, 0.9)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: loading ? 'wait' : avatarState ? 'move' : 'pointer',
                        textAlign: 'center',
                        mb: 2,
                        position: 'relative',
                        transition: 'transform 0.5s ease-in-out',
                        transform: animate ? 'scale(1.1)' : 'scale(0.99)',
                    } }
                    onClick={ () =>
                        !preview &&
                        !loading &&
                        fileInputRef.current?.click() }
                    onMouseDown={ handleMouseDown }
                    onMouseMove={ handleMouseMove }
                    onMouseUp={ handleMouseUp }
                >
                    { !preview && <AccountCircleIcon sx={ { fontSize: 100, cursor: loading ? 'wait' : avatarState ? 'move' : 'pointer' } }></AccountCircleIcon> }
                </Box>
                <input
                    type="file"
                    ref={ fileInputRef }
                    style={ { display: 'none' } }
                    onChange={ handleFileChange }
                />
                <br/>
                { preview && (
                    <Button sx={ { width: '100%' } } variant="contained" color="primary" onClick={ handleChangeImage }
                            disabled={ loading }
                    >
                        Change Image
                    </Button>
                ) }
                <LoadingButton
                    onClick={handleSubmit}
                    loading={loading}
                    loadingPosition="end"
                    color="success"
                    sx={ { width: '100%' } }
                    variant="contained"
                    disabled={avatarState === null}
                >
                    <span>Upload</span>
                </LoadingButton>
            </Stack>
        </form>
    );
};

export default AvatarForm;