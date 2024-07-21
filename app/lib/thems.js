'use client';
import { Roboto } from 'next/font/google';
import { createTheme } from '@mui/material/styles';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const roboto = Roboto({
    weight: ['300', '400', '500', '700'],
    subsets: ['latin'],
    display: 'swap',
});

const darkTheme = createTheme({
    typography: {
        fontFamily: roboto.style.fontFamily,
    },
    palette: {
        primary: {
            main: "#1760a5",
            light: "skyblue"
        },
        secondary: {
            main: '#15c630',
        },
        otherColor: {
            main: "#999"
        },
        mode: 'dark',
        background: {
            default: 'rgb(43,43,43)', // Set your desired background color
        },
    },
});

const lightTheme = createTheme({
    typography: {
        fontFamily: roboto.style.fontFamily,
    },
    palette: {
        primary: {
            main: "#1760a5",
            light: "skyblue"
        },
        secondary: {
            main: '#15c630',
        },
        otherColor: {
            main: "#999"
        },
        mode: 'light',
        background: {
            default: 'rgb(198,198,198)', // Set your desired background color
        },
    },
});

export default darkTheme;