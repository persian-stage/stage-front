'use client';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch, RootState, store } from './store';
import { login as loginService } from '../services/apiService';
import { User, RegisterProfileErrorState, ErrorMessage } from '../interfaces';
import { setAvatarUrl } from "@/app/state/registerSlice";
import { setProfileAppRegistered } from "@/app/state/profileApp/profileAppSlice";
import { setLoading } from "@/app/state/commonSlice";
import { apiService } from "@/app/utils/apiServiceSetup";
import { API_ENDPOINTS } from "@/app/config/apiEndpoints";

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
        setErrors: (state, action: PayloadAction<ErrorMessage[]>) => {
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
        logout: (state) => {
            return initialState;
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
    setErrors,
    setIsUserLoggedIn,
    setUser,
    logout
} = authSlice.actions;

export const getUserData = async () => {
    const response = await apiService.get(API_ENDPOINTS.USER);
    return response.data;
}

export const checkUserAuthentication = () => async (dispatch: AppDispatch) => {
    store.dispatch(setLoading(true));
    try {
        const data = await getUserData();
        if (data.user) {
            store.dispatch(setUser({ id: data.user.id, email: data.user.email, name: data.user.firstname, avatar: data.user.avatar, appsRegistered: data.user.app }));
            store.dispatch(setIsUserLoggedIn(true));
            if (!!data.apps && data.apps.length > 0) {
                // data.user.app.forEach(appKey => {
                // });
                store.dispatch(setProfileAppRegistered(true));

            }
            // store.dispatch(setProfileAppRegistered(true));
        }
    } catch (error) {
        // handleErrors(error, dispatch, setErrors);
        store.dispatch(setIsUserLoggedIn(false));

    } finally {
        store.dispatch(setLoading(false));
    }
};

export const login = (email: string, password: string) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
        const response = await loginService(email, password);
        if (response?.loggedIn == 'true') {
            store.dispatch(setIsUserLoggedIn(true));

            const user: User = await getUserData();
            // store.dispatch(setUser());
            store.dispatch(setAvatarUrl(user.avatar ?? ''));
            store.dispatch(toggleAuthFormOpen());
            store.dispatch(checkUserAuthentication());

            // if (Array.isArray(user.appsRegistered)) {
            //     user.appsRegistered.forEach(appKey => {
            //         setAppRegistered(appKey, true);
            //     });
            // }

            return user;
        }
    } catch (error) {
        // handleErrors(error, dispatch, setErrors);
    } finally {
        dispatch(setLoading(false));
    }
    return null;
};

export const selectIsUserLoggedIn = (state: RootState) => state.auth.isUserLoggedIn;
export default authSlice.reducer;