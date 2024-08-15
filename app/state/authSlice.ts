'use client';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from './store';
import { getUserData as UserDataService, login as loginService, logout as logoutService } from '../services/apiService';
import { User } from '../interfaces';
import { setLoading } from "@/app/state/generalSlice";
import { setAppRegistered } from "@/app/utils/genericFunctions";

interface AuthState {
    email: string;
    firstname: string;
    lastname: string;
    password: string;
    isAuthFormOpen: boolean;
    showPassword: boolean;
    error: string | null;
    isUserLoggedIn: boolean;
    mode: 'login' | 'register';
    user: User | null;
}

const initialState: AuthState = {
    email: '',
    firstname: '',
    lastname: '',
    password: '',
    isAuthFormOpen: false,
    showPassword: false,
    error: null,
    isUserLoggedIn: false,
    mode: 'login',
    user: null,
};

const authSlice = createSlice({
    name: 'authLogin',
    initialState,
    reducers: {
        setEmail(state, action: PayloadAction<string>) {
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
            console.log('toggleAuthFormOpen');
            state.isAuthFormOpen = !state.isAuthFormOpen;
        },
        toggleShowPassword(state) {
            state.showPassword = !state.showPassword;
        },
        setError(state, action: PayloadAction<string | null>) {
            state.error = action.payload;
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
    toggleMode,
    setError,
    setIsUserLoggedIn,
    setUser,
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
        dispatch(setError((error as Error).message));
    } finally {
        dispatch(setLoading(false));
    }
};

export const login = (email: string, password: string) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
        const data = await loginService(email, password);
        if (data?.loggedIn == 'true') {
            const user: User = await UserDataService();
            dispatch(setUser(user));
            dispatch(toggleAuthFormOpen());
            dispatch(setIsUserLoggedIn(true));

            if (Array.isArray(user.appRegistered)) {
                user.appRegistered.forEach(appKey => {
                    setAppRegistered(appKey, true);
                });
            }

            return user;
        }
    } catch (error) {
        dispatch(setError((error as Error).message));
    } finally {
        dispatch(setLoading(false));
    }
    return null;
};

export default authSlice.reducer;