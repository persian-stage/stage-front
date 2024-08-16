'use client';
import React from 'react';
import { Box, Button, Divider, Modal } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/state/store';
import { login, toggleAuthFormOpen, toggleMode } from '@/app/state/authSlice';
import { register } from '@/app/state/registerSlice';
import LoginForm from '../../forms/LoginForm';
import RegisterForm from '../../forms/RegisterForm';

const LoginModal = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { isAuthFormOpen, mode } = useSelector((state: RootState) => state.auth);

    const handleClose = () => {
        dispatch(toggleAuthFormOpen());
    };

    const submitForm = (email: string, password: string, firstname?: string, lastname?: string) => {
        if (mode === 'login') {
            console.log('login');
            dispatch(login(email, password));
        } else {
            dispatch(register(email, password, firstname!, lastname!));
        }
    };

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        borderRadius: 2,
        pt: 2,
        px: 4,
        pb: 3,
    };

    return (
        <Modal
            open={ isAuthFormOpen }
            onClose={ handleClose }
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
        >
            <Box sx={ { ...style, width: 400 } }>
                { mode === 'login' ? <LoginForm submitForm={ submitForm }/> :
                    <RegisterForm submitForm={ submitForm }/> }
                <br/>
                <Divider>OR</Divider>
                <br/>
                <Button sx={ { width: '100%' } } variant="contained" onClick={ () => dispatch(toggleMode()) }>
                    { mode === 'login' ? 'Register' : 'Login' }
                </Button>
            </Box>
        </Modal>
    );
};

export default LoginModal;