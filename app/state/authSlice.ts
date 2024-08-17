'use client';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from './store';
import { getUserData as UserDataService, login as loginService } from '../services/apiService';
import { User } from '../interfaces';
import { handleErrors } from "@/app/utils/errorHandler";

interface AuthState {
    email: string;
    firstname: string;
    lastname: string;
    password: string;
    isAuthFormOpen: boolean;
    showPassword: boolean;
    loading: boolean;
    isUserLoggedIn: boolean;
    mode: 'login' | 'register';
    user: User | null;
}

interface RegisterProfileErrorState {
    errors: string[];
}

const initialState: AuthState & RegisterProfileErrorState = {
    email: '',
    firstname: '',
    lastname: '',
    password: '',
    isAuthFormOpen: false,
    showPassword: false,
    loading: false,
    errors: [],
    isUserLoggedIn: false,
    mode: 'login',
    user: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setEmail(state, action) {
            state.email = action.payload;
        },
        setFirstname(state, action: PayloadAction<string>) {
            state.firstname = action.payload;
        },
        setLastname(state, action: PayloadAction<string>) {
            state.lastname = action.payload;
        },
        setPassword(state, action: PayloadAction<string>) {
            state.password = action.payload;
        },
        toggleAuthFormOpen(state) {
            state.isAuthFormOpen = !state.isAuthFormOpen;
        },
        toggleShowPassword(state) {
            state.showPassword = !state.showPassword;
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },
        setErrors: (state, action: PayloadAction<string[]>) => {
            state.errors = action.payload;
        },
        toggleMode(state) {
            state.mode = state.mode === 'login' ? 'register' : 'login';
        },
        setIsUserLoggedIn(state, action: PayloadAction<boolean>) {
            state.isUserLoggedIn = action.payload;
        },
        setUser(state, action: PayloadAction<User | null>) {
            state.user = action.payload;
        },
    },
});

export const {
    setEmail,
    setFirstname,
    setLastname,
    setPassword,
    toggleAuthFormOpen,
    toggleShowPassword,
    setLoading,
    toggleMode,
    setErrors,
    setIsUserLoggedIn,
    setUser
} = authSlice.actions;

export const checkUserAuthentication = () => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
        const user: User = await UserDataService();
        if (user) {
            dispatch(setUser(user));
            dispatch(setIsUserLoggedIn(true));
        }
    } catch (error) {
        handleErrors(error, dispatch, setErrors);
    } finally {
        dispatch(setLoading(false));
    }
};

export const login = (email: string, password: string) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
        const response = await loginService(email, password);
        if (response?.loggedIn == 'true') {
            const user: User = await UserDataService();
            dispatch(setUser(user));
            dispatch(toggleAuthFormOpen());
            dispatch(setIsUserLoggedIn(true));

            // if (Array.isArray(user.appsRegistered)) {
            //     user.appsRegistered.forEach(appKey => {
            //         setAppRegistered(appKey, true);
            //     });
            // }

            return user;
        }
    } catch (error) {
        handleErrors(error, dispatch, setErrors);
    } finally {
        dispatch(setLoading(false));
    }
    return null;
};

export default authSlice.reducer;