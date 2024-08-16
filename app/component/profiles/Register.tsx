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
import { setLookingForwardToGender, setCountry, setCity, setDateOfBirth, setProfileUsername } from "@/app/state/profileApp/registerSlice";
import { RegisterProfileState } from "@/app/interfaces/profile";
import { countries } from "@/app/constants/countries";
import { useEffect } from "react";
import { registerProfile } from "@/app/state/profileApp/registerSlice";
import { CitySelector } from "@/app/component/profiles/CitySelector";

export default function Register()  {
    const dispatch = useDispatch<AppDispatch>();

    const {
        profileUsername,
        lookingForwardToGender,
        country,
        city,
        dateOfBirth,
        errors
    } = useSelector((state: RootState) => state.registerProfile);

    useEffect(() => {

        console.log('lookingForwardToGender: ', lookingForwardToGender);

    }, [lookingForwardToGender]);

    const handleSubmit = () => {
        const profile: RegisterProfileState = { profileUsername, lookingForwardToGender, country, city, dateOfBirth };

        console.log('Profile: ', profile);

        registerProfile(profile);
    }

    return (
        <form>
            <Box>
                <Grid container rowSpacing={2} direction='column' sx={{mt: 20, borderRadius:1}}
                      display="flex" justifyContent="center" alignItems="center">
                    <Grid xs={12} sm={6} md={4}>
                        <FormControl>
                            <FormLabel id="demo-row-radio-buttons-group-label">Looking for a</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                value={lookingForwardToGender || "female"}
                                onChange={e => dispatch(setLookingForwardToGender(e.target.value))}
                            >
                                <FormControlLabel value="female" control={<Radio />} label="Female" />
                                <FormControlLabel value="male" control={<Radio />} label="Male" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid xs={12} sm={6} md={4}>
                        <Autocomplete
                            id="country-select"
                            sx={{ width: 300 }}
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
                                    'TimePicker',
                                    'DateTimePicker',
                                    'DateRangePicker',
                                    'DateTimeRangePicker',
                                ]}
                            >
                                <DemoItem label={
                                    // <Label componentName="DatePicker" valueType="date" />
                                    "Date of birth"
                                }>
                                    <DatePicker />
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