'use client';
import React, { useState} from 'react';
import Image from 'next/image';
import { SlideshowRef, Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Box from "@mui/material/Box";

const SlideShow = () => {
    const [isHovered, setIsHovered] = useState(false);

    const properties = {
        prevArrow: <ArrowBackIosNewIcon
            sx={{
                fontSize: { xs: '50px', sm: '70px', md: '80px', lg: '100px' },
                opacity: isHovered ? 1 : 0,
                visibility: isHovered?'visible':'hidden',
                transition: 'opacity 0.7s, visibility 0.5s',
                marginLeft: { xs: '5px', sm: '10px', md: '50px', lg: '50px' }
            }}
            color="action"></ArrowBackIosNewIcon>,
        nextArrow: <ArrowForwardIosIcon
            sx={{
                fontSize: { xs: '50px', sm: '70px', md: '80px', lg: '100px' },
                opacity: isHovered ? 1 : 0,
                visibility: isHovered?'visible':'hidden',
                transition: 'opacity 0.7s, visibility 0.5s',
                marginRight: { xs: '5px', sm: '10px', md: '50px', lg: '50px' }
        }} color="action"></ArrowForwardIosIcon>
    }

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };


    return (
        <Box
             sx={{
                 width: '100%',
                 // borderRadius: 3,
                 overflow: 'hidden',
                 position: 'relative',
             }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}>
            <Fade {...properties}>
                <Box
                    sx={{
                        width: '100%',
                        height: { xs: '250px', sm: '350px', md: '400px', lg: '550px' }
                    }}
                >
                    <Image
                        src="/img/iran1.jpg"
                        layout="fill"
                        alt="Picture of the author"
                        quality={75}
                    />
                </Box>
                <Box
                    sx={{
                        width: '100%',
                        height: { xs: '200px', sm: '250px', md: '300px', lg: '350px' }
                    }}
                >
                    <Image
                        src="/img/iran2.jpg"
                        layout="fill"
                        alt="Picture of the author"
                        quality={75}
                    />
                </Box>
            </Fade>
        </Box>
    );
};

export default SlideShow;