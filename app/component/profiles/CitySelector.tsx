'use client';
import * as React from 'react';
import { Autocomplete, TextField } from "@mui/material";
import { useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { City } from "@/app/interfaces";
import { getCities } from "@/app/services/locationApiService";

interface Props {
    country: string | null;
}

export function CitySelector({ country }: Props) {
    const [ open, setOpen ] = React.useState(false);
    const [ options, setOptions ] = React.useState<readonly City[]>([]);
    const loading = open && options.length === 0;

    useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }

        function sleep(duration: number): Promise<void> {
            return new Promise<void>((resolve) => {
                setTimeout(() => {
                    resolve();
                }, duration);
            });
        }

        (async () => {
            await sleep(1e3); // For demo purposes.

            if (active) {
                if (!!country) {
                    const cities: City[] = await getCities(country);
                    setOptions([ ...cities ]);
                }
            }
        })();

        return () => {
            active = false;
        };
    }, [ loading, country ]);

    return (
        <Autocomplete
            id="asynchronous-demo"
            open={ open }
            onOpen={ () => {
                setOpen(true);
            } }
            disabled={ !country }
            onClose={ () => {
                setOpen(false);
            } }
            isOptionEqualToValue={ (option, value) => option.name === value.name }
            getOptionLabel={ (option) => option.name }
            options={ options }
            loading={ loading }
            renderInput={ (params) => (
                <TextField
                    { ...params }
                    label="Asynchronous"
                    InputProps={ {
                        ...params.InputProps,
                        endAdornment: (
                            <React.Fragment>
                                { loading ? <CircularProgress color="inherit" size={ 20 }/> : null }
                                { params.InputProps.endAdornment }
                            </React.Fragment>
                        ),
                    } }
                />
            ) }
        />
    );
};