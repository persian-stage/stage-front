'use client';
import { Roboto } from 'next/font/google';
import { createTheme } from '@mui/material/styles';

const roboto = Roboto({
    weight: ['300', '400', '500', '700'],
    subsets: ['latin'],
    display: 'swap',
});

const theme = createTheme({
    typography: {
        fontFamily: roboto.style.fontFamily,
    },
    palette:{
        primary:{
            main: "#1760a5",
            light: "skyblue"
        },
        secondary:{
            main: '#15c630',
        },
        otherColor:{
            main:"#999"
        },
        mode: 'dark',
    }
});

export default theme;