'use client';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch, store } from './store';
import { register as registerService } from '../services/apiService';
import { ErrorMessage, RegisterProfileErrorState } from "@/app/interfaces";

interface RegisterState {
    email: string;
    password: string;
    firstname: string;
    lastname: string;
    loading: boolean;
    showPassword: boolean;
}

const initialState: RegisterState & RegisterProfileErrorState = {
    email: '',
    password: '',
    firstname: '',
    lastname: '',
    loading: false,
    errors: [],
    showPassword: false,
};

const registerSlice = createSlice({
    name: 'register',
    initialState,
    reducers: {
        setEmail(state, action: PayloadAction<string>) {
            state.email = action.payload;
        },
        setPassword(state, action: PayloadAction<string>) {
            state.password = action.payload;
        },
        setFirstname(state, action: PayloadAction<string>) {
            state.firstname = action.payload;
        },
        setLastname(state, action: PayloadAction<string>) {
            state.lastname = action.payload;
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },
        setErrors: (state, action: PayloadAction<ErrorMessage[]>) => {
            state.errors = action.payload;
        },
        toggleShowPassword(state) {
            state.showPassword = !state.showPassword;
        },
    },
});

export const {
    setEmail,
    setPassword,
    setFirstname,
    setLastname,
    setLoading,
    setErrors,
    toggleShowPassword,
} = registerSlice.actions;

export const register = (email: string, password: string, firstname: string, lastname: string) => async (dispatch: AppDispatch) => {
    store.dispatch(setLoading(true));
    try {
        const response = await registerService(email, password, firstname, lastname);

        // TODO we will remove token from response
        if (response.token !== null && response.token !== undefined) {
            store.dispatch(setErrors([]));
        }

        if (response.formErrors.length >= 0) {
            store.dispatch(setErrors(response.formErrors));
        }

        // Handle successful registration (e.g., store token, redirect, etc.)
    } catch (error) {
        // store.dispatch(setErrors(null));
    } finally {
        store.dispatch(setLoading(false));
    }
};

export default registerSlice.reducer;