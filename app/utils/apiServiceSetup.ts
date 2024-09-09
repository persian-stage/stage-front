'use client';
import axios from 'axios';
import { notify } from "@/app/utils/notification";
import { VariantType } from "notistack";
import { store } from '@/app/state/store';
import { setReTry, setRedirect } from '@/app/state/networkSlice';
import { selectIsUserLoggedIn } from '@/app/state/authSlice';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const createApiService = () => {
    const apiService = axios.create({
        baseURL: API_BASE_URL,
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true,
    });

    apiService.interceptors.request.use(
        config => {
            const state = store.getState();
            const isLoggedIn = selectIsUserLoggedIn(state); // Use the selector here
            const isAuthRequest = config.url?.includes('/auth');

            if (!isLoggedIn && !isAuthRequest) {
                notify('You need to log in to continue.', 'warning');
                return Promise.reject();
            }

            return config;
        },
        error => {
            return Promise.reject();
        }
    );

    apiService.interceptors.response.use(
        response => {
            if (response.status === 307 && response.data.redirectUrl) {
                store.dispatch(setRedirect(response.data.redirectUrl));
            }
            return response;
        },
        error => {

            let errorMessage = 'An error occurred';
            let variant: VariantType = 'warning';

            if (!error.response) {
                errorMessage = 'No internet connection';
                variant = 'error';
                store.dispatch(setReTry(true));
            } else if (error.response?.status === 403) {
                errorMessage = 'Authentication failed';
                variant = 'error';
            } else if (error.response?.status >= 500) {
                errorMessage = 'Server Error';
                variant = 'error';
                store.dispatch(setReTry(true));
            } else if (error.response?.status === 307 && error.response.data.redirectUrl) {
                store.dispatch(setRedirect(error.response.data.redirectUrl));
                return Promise.resolve();
            }

            notify(errorMessage, variant);
            return Promise.reject(error);
        }
    );

    return apiService;
};

export const apiService = createApiService();