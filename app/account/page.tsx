'use client';
import * as React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Modal
} from '@mui/material';
import Stack from "@mui/material/Stack";
import { deleteAccount, deleteAvatar } from "@/app/services/apiService";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/system";
import { resetStates } from "@/app/hooks/useLogout";
import AvatarForm from "@/app/component/forms/AvatarForm";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/state/store";
import { setUser } from "@/app/state/authSlice";
import { useEffect } from "react";

export default function Account() {
    const dispatch = useDispatch<AppDispatch>();
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [avatarModalShow, setAvatarModalShow] = React.useState<boolean>(false);
    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const { user } = useSelector((state: RootState) => state.auth);

    const deleteAccountHandler = async () => {
        const res = await deleteAccount();
        if (res.status === "200") {
            await resetStates();
        }
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setModalOpen(false);
    };

    function handleChangeAvatar() {
        setAvatarModalShow(true);
        setModalOpen(true);
    }

    const deleteAvatarHandler = async () => {
        const res = await deleteAvatar();
        if (res.data.status === "200" && user) {
            dispatch(setUser({
                ...user,
                avatar: null,
                email: user.email ?? '',
                id: user.id ?? 0,
                name: user.name ?? '',
                appsRegistered: user.appsRegistered ?? []
            }));
        }
    }

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
        <>
            <Grid container spacing={2}>
                <Grid xs={12} md={12}>
                    <h1>Account</h1>
                </Grid>
                <Grid xs={12} md={12}>
                    <Grid md={12}>
                        <h2>Avatar:</h2>
                    </Grid>
                    <Stack direction="row" spacing={2}>
                        <Button variant="contained" color="primary" onClick={handleChangeAvatar}>
                            Change Avatar
                        </Button>
                        <Button variant="contained" color="error" onClick={deleteAvatarHandler}>
                            Delete Avatar
                        </Button>
                    </Stack>
                </Grid>
                <Grid xs={12} md={12}>
                </Grid>
                <Grid xs={12} md={12}>
                    <Button variant="contained" color="error" onClick={handleClickOpen}>
                        Delete Account
                    </Button>
                </Grid>
            </Grid>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {"Are you sure you want to delete your account?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        This action cannot be undone. This will permanently delete your account and all data associated with it.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => {
                        deleteAccountHandler();
                        handleClose();
                    }
                    } color="error">
                        Delete my Account
                    </Button>
                </DialogActions>
            </Dialog>
            <Modal
                open={ modalOpen }
                onClose={ handleClose }
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={ { ...style, width: 400 } }>
                    <IconButton
                        sx={{
                            position: 'absolute',
                            right: { xs: 20, sm: 15 },
                            top: { xs: 10, sm: 10 },
                            padding: 0,
                            color: 'white',
                            display: 'flex',
                            '& .MuiSvgIcon-root': {
                                fontSize: { xs: '1.5rem', sm: '1.5rem' }
                            }
                        }}
                        aria-label="close"
                        onClick={handleClose}
                    >
                        <CloseIcon />
                    </IconButton>
                        <AvatarForm />
                </Box>
            </Modal>
        </>
    );
}
