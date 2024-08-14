'use client';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from './store';
import { getUserData as UserDataService, login as loginService, logout as logoutService } from '../services/apiService';
import { User } from '../interfaces';
import { useRouter } from "next/navigation";

interface AuthState {
    email: string;
    firstname: string;
    lastname: string;
    password: string;
    isAuthFormOpen: boolean;
    showPassword: boolean;
    loading: boolean;
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
    loading: false,
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
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
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
    setLoading,
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
            return user;
        }
    } catch (error) {
        dispatch(setError((error as Error).message));
    } finally {
        dispatch(setLoading(false));
    }
    return null;
};

export const logout = () => async (dispatch: AppDispatch) => {
    console.log('logout');
    const { push } = useRouter();
    dispatch(setLoading(true));
    try {
        await logoutService();
        dispatch(setUser(null));
        dispatch(setIsUserLoggedIn(false));
        push('/');
    } catch (error) {
        dispatch(setError((error as Error).message));
    } finally {
        dispatch(setLoading(false));
    }
}

export default authSlice.reducer;