'use client';
import * as React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import Button from "@mui/material/Button";
import {useRouter} from "next/navigation";
import {useEffect} from "react";
import {useGlobalContext, State} from "@/app/context/GlobalContext";
import CachedIcon from '@mui/icons-material/Cached';
import { fetchDatingData } from '@/app/apis/datingApis'

const profiles = [
    {}
];

export interface AppData {
    profiles?: {};
    status: string;
    redirectUrl: string;
}

export default function Dating() {
    const { state, setState } = useGlobalContext();
    const router = useRouter();

    const loading = true;

    const fetchData = async () => {
        const data: AppData | null | undefined = await fetchDatingData();
        if (data === null) {
            setState((prevState: State): State => ({
                ...prevState,
                reTry: true,
            }));
            return;
        }
        if (data && data.status === "307") {
            router.refresh();
            router.push(`dating/${data.redirectUrl || ''}`);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const reTrayFetch = () => {
        setState({
            ...state,
            reTry: false
        });
        fetchData();
    }

    return (
      <Grid container rowSpacing={2} sx={{mt: 0}}>
          {!state.reTry ? (loading ? Array.from(new Array(3)) : profiles).map((item, index) => (
              <Grid key={index} xs={12} sm={6} md={4}>
                  <Box key={index} sx={{ my: 5, mx: 3 }}>
                      {item ? (
                          <img
                              style={{ height: 118 }}
                              alt={item.title}
                              src={item.src}
                          />
                      ) : (
                          <Skeleton variant="rectangular" style={{borderRadius: 5}}  height={118} />
                      )}
                      {item ? (
                          <Box sx={{ pr: 2 }}>
                              <Typography gutterBottom variant="body2">
                                  {item.title}
                              </Typography>
                              <Typography display="block" variant="caption" color="text.secondary">
                                  {item.channel}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                  {`${item.views} • ${item.createdAt}`}
                              </Typography>
                          </Box>
                      ) : (
                          <Box sx={{ pt: 0.5 }}>
                              <Skeleton />
                              <Skeleton width="60%" />
                          </Box>
                      )}
                  </Box>
              </Grid>
          )):<Box
              sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                  height: '100vh'
              }}
          >
              <Button variant="contained" startIcon={<CachedIcon />} onClick={reTrayFetch}>
                  Please Try Again
              </Button>
          </Box>}
      </Grid>
    );
}
