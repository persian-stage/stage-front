'use client';
import * as React from 'react';
import { Autocomplete, TextField } from "@mui/material";
import { useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { City } from "@/app/interfaces";
import { getCities } from "@/app/services/locationApiService";
import { setCity } from "@/app/state/profileApp/registerSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/state/store";

interface Props {
    country: string | null,
}

export function CitySelector({ country }: Props) {

    const dispatch = useDispatch<AppDispatch>();
    const [ open, setOpen ] = React.useState(false);
    const [ options, setOptions ] = React.useState<readonly City[]>([]);
    const [ selectedCity, setSelectedCity ] = React.useState<City | null>(null);
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
            await sleep(1e3);

            if (active) {
                if (!!country) {
                    const cities: City[] | any = await getCities(country);
                    const formattedCities: City[] = cities.map((city: City) => ({ label: city.label }));
                    setOptions([ ...formattedCities ]);
                }
            }
        })();

        return () => {
            active = false;
        };
    }, [ loading, country ]);

    useEffect(() => {
        setOptions([]);
        setSelectedCity(null);
        dispatch(setCity(''));
    }, [country, dispatch]);

    return (
        <Autocomplete
            id="asynchronous-city-selector"
            open={ open }
            onOpen={ () => {
                setOpen(true);
            } }
            disabled={ !country }
            onClose={ () => {
                setOpen(false);
            } }
            value={ selectedCity }
            isOptionEqualToValue={ (option, value) => option.label === value.label }
            getOptionLabel={ (option) => option.label }
            options={ options }
            loading={ loading }
            onChange={ (e, value) => {
                setSelectedCity(value);
                dispatch(setCity(value?.label || ''))
            } }
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