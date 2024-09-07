'use client';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RegisterProfileState, DateOfBirth } from "@/app/interfaces/profile";
import { registerProfile as registerProfileService } from "@/app/services/profileApiService";
import { setLoading } from "@/app/state/commonSlice";
import { ErrorMessage } from "@/app/interfaces";
import { store } from "@/app/state/store";
import { setProfileAppRegistered } from "@/app/state/profileApp/profileAppSlice";

const initialState: RegisterProfileState = {
    gender: 'male',
    dateOfBirth: {
        day: 1,
        month: 1,
        year: 2000
    },
    country: '',
    city: '',
    profileUsername: '',
    errors: []
};

const registerSlice = createSlice({
    name: 'register',
    initialState,
    reducers: {
        setGender: (state, action: PayloadAction<string>) => {
            state.gender = action.payload;
        },
        setDateOfBirth: (state, action: PayloadAction<DateOfBirth>) => {
            state.dateOfBirth = action.payload;
        },
        setCountry: (state, action: PayloadAction<string>) => {
            state.country = action.payload;
        },
        setCity: (state, action: PayloadAction<string>) => {
            state.city = action.payload;
        },
        setProfileUsername: (state, action: PayloadAction<string>) => {
            state.profileUsername = action.payload;
        },
        setErrors: (state, action: PayloadAction<ErrorMessage[]>) => {
            state.errors = action.payload;
        },
    }
});

export const {
    setGender,
    setDateOfBirth,
    setCountry,
    setCity,
    setProfileUsername,
    setErrors
} = registerSlice.actions;

export const registerProfile = (profile: RegisterProfileState) => async (dispatch: any) => {
    try {
        // await registerProfileSchema.validate(profile, { abortEarly: false });
        const response = await registerProfileService(profile);

        if (response.redirectUrl !== '') {
            store.dispatch(setProfileAppRegistered(true));
        }

    } catch (error) {
        // handleErrors(error, dispatch, setErrors);
    } finally {
        store.dispatch(setLoading(false));
    }
}
export default registerSlice.reducer;
