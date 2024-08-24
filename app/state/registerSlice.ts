'use client';
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch, store } from './store';
import { register as registerService, uploadAvatar as uploadAvatarService } from '../services/apiService';
import { ErrorMessage, RegisterProfileErrorState } from "@/app/interfaces";
import { checkUserAuthentication, setIsUserLoggedIn, setUser, toggleAuthFormOpen } from "@/app/state/authSlice";
import { setLoading } from "@/app/state/commonSlice";

interface RegisterState {
    email: string;
    password: string;
    firstname: string;
    lastname: string;
    loading: boolean;
    showPassword: boolean;
    avatarMode: boolean;
    avatar: { name: string, url: string } | null;
    avatarUrl: string;
}

const initialState: RegisterState & RegisterProfileErrorState = {
    email: '',
    password: '',
    firstname: '',
    lastname: '',
    loading: false,
    errors: [],
    showPassword: false,
    avatarMode: false,
    avatar: null,
    avatarUrl: '',
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
        setAvatarMode(state, action: PayloadAction<boolean>) {
            state.avatarMode = action.payload;
        },
        setAvatar(state, action: PayloadAction<{ name: string, url: string }>) {
            state.avatar = action.payload;
        },
        setAvatarUrl(state, action: PayloadAction<string>) {
            state.avatarUrl = action.payload;
        }
    },
    extraReducers: (builder) => {
    builder.addCase(uploadAvatar.fulfilled, (state, action) => {
        state.avatar = action.payload;
    });
},
});

export const {
    setEmail,
    setPassword,
    setFirstname,
    setLastname,
    setErrors,
    toggleShowPassword,
    setAvatarMode,
    setAvatar,
    setAvatarUrl
} = registerSlice.actions;

export const register = (email: string, password: string, firstname: string, lastname: string) => async (dispatch: AppDispatch) => {
    store.dispatch(setLoading(true));
    try {

        const response = await registerService(email, password, firstname, lastname);

        // TODO we will remove token from response
        if (response.token !== null && response.token !== undefined) {
            store.dispatch(setErrors([]));
            store.dispatch(setAvatarMode(true));
            store.dispatch(setUser(response.user));
            store.dispatch(toggleAuthFormOpen());
            store.dispatch(setIsUserLoggedIn(true));
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

export const uploadAvatar = createAsyncThunk(
    'register/uploadAvatar',
    async (avatar: File, { dispatch }) => {
        store.dispatch(setLoading(true));
        try {
            const response = await uploadAvatarService(avatar);
            // store.dispatch(setUser(response.user));
            store.dispatch(setAvatarUrl(response.data.avatarUrl));
            store.dispatch(setAvatarMode(false));
            store.dispatch(setIsUserLoggedIn(true));
            store.dispatch(checkUserAuthentication());
            // Handle successful upload (e.g., update state with new avatar URL)
            return response.avatarUrl;
        } catch (error) {
            // Handle error (e.g., dispatch setErrors)
            throw error;
        } finally {
            store.dispatch(setLoading(false));
        }
    }
);

export default registerSlice.reducer;