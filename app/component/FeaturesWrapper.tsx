'use client';
import * as React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Features from "@/app/component/Features";
import Link from "next/link";
import { PATHS } from "@/app/constants/paths";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import Button from "@mui/material/Button";
import { useMediaQuery } from "@mui/system";
import { useTheme } from "@mui/material/styles";

export default function FeaturesWrapper() {
    const [open, setOpen] = React.useState(sessionStorage.getItem('experimental') === 'true' ? false : true);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleClose = () => {
        setOpen(false);
        sessionStorage.setItem('experimental', 'true');
    };

    return (
        <>
            <Grid container rowSpacing={2} sx={{mt: 0}} columnSpacing={{ xs: 0, sm: 1, md: 3 }} >
                <Grid xs={12} sm={6} md={4}>
                    <Link href={ PATHS.PROFILES } style={{ textDecoration: 'none' }}>
                        <Features
                            title="Profiles App"
                            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi."
                            img="/img/friends.jpg"
                        ></Features>
                    </Link>
                </Grid>
            </Grid>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {"Notice:"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        This project is experimental. Please do not upload personal data or sensitive information.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}