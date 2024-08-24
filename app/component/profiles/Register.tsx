'use client';
import * as React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import {Autocomplete, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField} from "@mui/material";
import Box from "@mui/material/Box";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {DemoContainer, DemoItem} from "@mui/x-date-pickers/internals/demo";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from "@/app/state/store";
import { setLookingForwardToGender, setCountry, setGender, setDateOfBirth, setProfileUsername } from "@/app/state/profileApp/registerSlice";
import { countries } from "@/app/constants/countries";
import { registerProfile } from "@/app/state/profileApp/registerSlice";
import { CitySelector } from "@/app/component/profiles/CitySelector";
import { Dayjs } from "dayjs";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { PATHS } from "@/app/constants/paths";
import { setRedirect } from "@/app/state/networkSlice";

export default function Register()  {
    const dispatch = useDispatch<AppDispatch>();
    const { isProfileAppRegistered } = useSelector((state: RootState) => state.profileApp);

    const router = useRouter();

    const {
        profileUsername,
        lookingForwardToGender,
        gender,
        country,
        city,
        dateOfBirth,
        errors
    } = useSelector((state: RootState) => state.registerProfile);


    useEffect(() => {
        if (isProfileAppRegistered) {
            router.push(PATHS.PROFILES);
        }
    }, [isProfileAppRegistered, dispatch, router]);

    const handleDateChange = (date: Dayjs | null) => {
        if (date) {
            const day = date.date();
            const month = date.month() + 1;
            const year = date.year();
            dispatch(setDateOfBirth({ day, month, year }));
        }
    };

    const handleSubmit = () => {
        dispatch(registerProfile({ profileUsername, gender, lookingForwardToGender, country, city, dateOfBirth }));
    }

    return (
        <form>
            <Box>
                <Grid container rowSpacing={2} direction='column' sx={{mt: 20, borderRadius:1}}
                      display="flex" justifyContent="center" alignItems="center">
                    <Grid xs={12} sm={6} md={4}>
                        <FormControl>
                            <FormLabel id="demo-row-radio-buttons-group-label">You&apos;re Gender</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group-for-gender"
                                value={gender}
                                onChange={e => dispatch(setGender(e.target.value))}
                            >
                                <FormControlLabel value="female" control={<Radio />} label="Female" />
                                <FormControlLabel value="male" control={<Radio />} label="Male" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid xs={12} sm={6} md={4}>
                        <FormControl>
                            <FormLabel id="demo-row-radio-buttons-group-label">Looking for a</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group-for-looking"
                                value={lookingForwardToGender}
                                onChange={e => dispatch(setLookingForwardToGender(e.target.value))}
                            >
                                <FormControlLabel value="female" control={<Radio />} label="Female" />
                                <FormControlLabel value="male" control={<Radio />} label="Male" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid xs={12} sm={6} md={4}>
                        <TextField
                            sx={ { width: '100%' } }
                            id="username"
                            label="Username"
                            onChange={(e) => dispatch(setProfileUsername(e.target.value))}
                        />
                    </Grid>
                    <Grid xs={12} sm={6} md={4}>
                        <Autocomplete
                            id="country-select"
                            options={countries}
                            autoHighlight
                            getOptionLabel={(option) => option.label}
                            onChange={(e, value) => dispatch(setCountry(value?.label || ''))}
                            renderOption={(props, option) => {
                                // @ts-ignore
                                const { key, ...optionProps } = props;
                                return (
                                    <Box
                                        key={key}
                                        component="li"
                                        sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                                        {...optionProps}
                                    >
                                        {option.label}
                                    </Box>
                                );
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Choose your country"
                                    inputProps={{
                                        ...params.inputProps,
                                        autoComplete: 'new-password', // disable autocomplete and autofill
                                    }}
                                />
                            )}
                        />
                    </Grid>
                    <Grid xs={12} sm={6} md={4}>
                        <CitySelector country={country}/>
                    </Grid>
                    <Grid xs={12} sm={6} md={4}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer
                                components={[
                                    'DatePicker',
                                ]}
                            >
                                <DemoItem label={
                                    "Date of birth"
                                }>
                                    <DatePicker onChange={handleDateChange}
                                    />
                                </DemoItem>
                            </DemoContainer>
                        </LocalizationProvider>
                    </Grid>
                    <Divider/>
                    <Grid xs={12} sm={6} md={4}>
                        <Button variant="contained" color="success" onClick={handleSubmit}>Send</Button>
                    </Grid>
                </Grid>
            </Box>
        </form>
    );
}