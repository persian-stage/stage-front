'use client';
import * as React from 'react';
import Grid from "@mui/material/Unstable_Grid2";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Skeleton } from "@mui/material";
import Image from "next/image";
import { User } from "@/app/interfaces";

interface Props {
    user: any;
}

export default function ChatBoxHeader({ user }: Props) {

    return (
        <Grid
            xs={12}
            sm={12}
            sx={{ display: { sm: 'flex', md: 'none'}, backgroundColor: '#9a9999', padding: 0, margin: 0}} >

            <Grid container >
                <Grid xs={2}  sm={2}
                      sx={{ paddingTop: 1, margin: 0}}
                >
                    <ChevronLeftIcon sx={{fontSize: 40}}/>
                </Grid>
                <Grid xs={2} sm={2}
                      sx={{ padding: 0, marginBottom: -1}}
                >
                    { !!user && user.avatar === '' ?
                        <Skeleton animation="wave" variant="circular" width={ 40 } height={ 40 }/> :
                        <Image
                            width={ 60 }
                            height={ 60 }
                            alt="Image"
                            src={ 'https://stage-app-profiles-germany.s3.amazonaws.com/user/1703/avatar/thumbnail/20240823T200627Z_aa3d874823d54cb0802c22cb03dc6008.jpg' }
                        />
                    }
                </Grid>
                <Grid xs={6} sm={6}
                      sx={{ padding: 0, margin: 0}}>
                    3
                </Grid>
            </Grid>
        </Grid>
    );
};