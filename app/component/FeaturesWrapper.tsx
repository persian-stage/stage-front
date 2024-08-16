'use client';
import * as React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import {styled} from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Features from "@/app/component/Features";
import Link from "next/link";
import { PATHS } from "@/app/constants/paths";

export default function FeaturesWrapper() {
    return (
        <>
            <Grid container rowSpacing={2} sx={{mt: 0}} columnSpacing={{ xs: 0, sm: 1, md: 3 }} >
                <Grid xs={12} sm={6} md={4}>
                    <Link href={ PATHS.PROFILES } style={{ textDecoration: 'none' }}>
                        <Features
                            title="Dating"
                            description="Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica"
                            img="/img/couple.jpg"
                        ></Features>
                    </Link>
                </Grid>
                <Grid xs={12} sm={6} md={4}>
                    <Link href={ PATHS.PROFILES } style={{ textDecoration: 'none' }}>
                        <Features
                            title="Dating"
                            description="Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica"
                            img="/img/couple.jpg"
                        ></Features>
                    </Link>
                </Grid>
                <Grid xs={12} sm={6} md={4}>
                    <Link href={ PATHS.PROFILES } style={{ textDecoration: 'none' }}>
                        <Features
                            title="Dating"
                            description="Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica"
                            img="/img/couple.jpg"
                        ></Features>
                    </Link>
                </Grid>
            </Grid>
        </>
    );
}