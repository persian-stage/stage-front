'use client';
import * as React from 'react';
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from '@mui/icons-material/Close';

const getSessionBannerStatus = () => {
    if (typeof window !== 'undefined') {
        return sessionStorage.getItem('bannerClosed') === 'true';
    }
    return false;
};

const setSessionBannerStatus = (status: boolean) => {
    if (typeof window !== 'undefined') {
        sessionStorage.setItem('bannerClosed', status ? 'true' : 'false');
    }
};

export default function CookieBanner() {
    const [visible, setVisible] = React.useState<boolean>(!getSessionBannerStatus());

    const handleClose = () => {
        setVisible(false);
        setSessionBannerStatus(true); // Save status to session storage
    };

    return (
        <>
            {visible && (
                <Box
                    sx={{
                        position: 'fixed',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        backgroundColor: 'rgba(0,0,0,0.8)',
                        color: 'white',
                        padding: { xs: 2, sm: 2, md: 2 },
                        paddingTop: { xs: 8, sm : 5, md: 2, lg: 2 },
                        paddingRight: { xs: 2, sm: 5, md: 10 },
                        textAlign: 'center',
                        zIndex: 1000,
                        transition: 'opacity 1s ease',
                        opacity: visible ? 1 : 0,
                    }}
                >
                    We use cookies strictly for essential functionality, such as enabling login and securing your account. By continuing to use this website, you consent to the use of these essential cookies. No tracking or marketing cookies are used.
                    <IconButton
                        sx={{
                            position: 'absolute',
                            right: { xs: 20, sm: 15 },
                            top: { xs: 10, sm: 10 },
                            padding: 0,
                            color: 'white',
                            display: 'flex',
                            '& .MuiSvgIcon-root': {
                                fontSize: { xs: '2rem', sm: '2rem' }
                            }
                        }}
                        aria-label="close"
                        onClick={handleClose}
                    >
                        <CloseIcon />
                    </IconButton>
                </Box>
            )}
        </>
    );
}
