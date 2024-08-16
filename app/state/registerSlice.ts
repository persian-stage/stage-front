'use client';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from './store';
import { register as registerService } from '../services/apiService';

interface RegisterState {
    email: string;
    password: string;
    firstname: string;
    lastname: string;
    loading: boolean;
    error: string | null;
}

const initialState: RegisterState = {
    email: '',
    password: '',
    firstname: '',
    lastname: '',
    loading: false,
    error: null,
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
        setError(state, action: PayloadAction<string | null>) {
            state.error = action.payload;
        },
    },
});

export const {
    setEmail,
    setPassword,
    setFirstname,
    setLastname,
    setLoading,
    setError
} = registerSlice.actions;

export const register = (email: string, password: string, firstname: string, lastname: string) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
        const response = await registerService(email, password, firstname, lastname);
        // Handle successful registration (e.g., store token, redirect, etc.)
    } catch (error) {
        dispatch(setError((error as Error).message));
    } finally {
        dispatch(setLoading(false));
    }
};

export default registerSlice.reducer;