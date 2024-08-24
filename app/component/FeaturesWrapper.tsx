'use client';
import * as React from "react";
import Grid from "@mui/material/Unstable_Grid2";
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
                            title="Profiles App"
                            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi."
                            img="/img/friends.jpg"
                        ></Features>
                    </Link>
                </Grid>
            </Grid>

        </>
    );
}