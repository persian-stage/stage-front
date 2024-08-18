'use client';
import React, { useState, useRef } from 'react';
import { Button, Stack, Box } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const AvatarForm = ({ submitForm }: { submitForm: (avatar: File) => void }) => {
    const [avatar, setAvatar] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [initialPosition, setInitialPosition] = useState({ x: 0, y: 0 });
    const [dragging, setDragging] = useState(false);
    const [animate, setAnimate] = useState(false);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleSubmit = () => {
        if (avatar) {
            submitForm(avatar);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        setAvatar(file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
                setAnimate(true);
                setTimeout(() => {
                    setAnimate(false);
                }, 3000);
            };
            reader.readAsDataURL(file);
        } else {
            setPreview(null);
        }
    };

    const handleMouseDown = (e: React.MouseEvent) => {
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
                        width: 100,
                        height: 100,
                        borderRadius: '50%',
                        backgroundImage: preview ? `url(${ preview })` : 'none',
                        backgroundSize: 'cover',
                        backgroundPosition: `${ position.x }px ${ position.y }px`,
                        border: '1px solid #ccc',
                        boxShadow: '0px 0px 30px -10px rgba(255, 255, 255, 0.9)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'move',
                        textAlign: 'center',
                        mb: 2,
                        position: 'relative',
                        transition: animate ? 'transform 3s ease-in-out' : 'none',
                        transform: animate ? 'scale(1.1)' : 'none',
                    } }
                    onClick={ () => !preview && fileInputRef.current?.click() }
                    onMouseDown={ handleMouseDown }
                    onMouseMove={ handleMouseMove }
                    onMouseUp={ handleMouseUp }
                >
                    { !preview && <AccountCircleIcon sx={ { fontSize: 100 } }></AccountCircleIcon> }
                </Box>
                <input
                    type="file"
                    ref={ fileInputRef }
                    style={ { display: 'none' } }
                    onChange={ handleFileChange }
                />
                <br/>
                { preview && (
                    <Button sx={ { width: '100%' } } variant="contained" color="primary" onClick={ handleChangeImage }>
                        Change Image
                    </Button>
                ) }
                <Button sx={ { width: '100%' } } variant="contained" color="success" onClick={ handleSubmit }>
                    Upload
                </Button>
            </Stack>
        </form>
    );
};

export default AvatarForm;