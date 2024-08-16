'use strict';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RegisterProfileState } from "@/app/interfaces/profile";
import { registerProfile as registerProfileService } from "@/app/services/profileApiService";
import { setLoading } from "@/app/state/generalSlice";
import { registerProfileSchema } from '@/app/validation/registerProfileSchema';
import { ValidationError } from "yup";
import { handleErrors } from "@/app/utils/errorHandler";

const initialState: RegisterProfileState = {
    lookingForwardToGender: 'female',
    dateOfBirth: '',
    country: '',
    city: '',
    profileUsername: '',
    errors: []
};

const registerSlice = createSlice({
    name: 'register',
    initialState,
    reducers: {
        setLookingForwardToGender: (state, action: PayloadAction<string>) => {
            state.lookingForwardToGender = action.payload;
        },
        setDateOfBirth: (state, action: PayloadAction<string>) => {
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
        setErrors: (state, action: PayloadAction<string[]>) => {
            state.errors = action.payload;
        },
    }
});

export const {
    setLookingForwardToGender,
    setDateOfBirth,
    setCountry,
    setCity,
    setProfileUsername,
    setErrors
} = registerSlice.actions;

export const registerProfile = (profile: RegisterProfileState) => async (dispatch: any) => {
    try {
        await registerProfileSchema.validate(profile, { abortEarly: false });
        const response = await registerProfileService(profile);

    } catch (error) {
        handleErrors(error, setErrors);
    } finally {
        dispatch(setLoading(false));
    }
}
export default registerSlice.reducer;
