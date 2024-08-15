import axios from 'axios';
import { notify } from "@/app/utils/notification";
import { VariantType } from "notistack";
import { store } from '@/app/state/store';
import { setReTry, setRedirect } from '@/app/state/networkSlice';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const createApiService = () => {
    const apiService = axios.create({
        baseURL: API_BASE_URL,
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true,
    });

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
            if (error.response?.status === 403) {
                errorMessage = 'Authentication failed';
                variant = 'error';
            } else if (error.response?.status >= 500) {
                errorMessage = 'Server Error';
                variant = 'error';
                store.dispatch(setReTry(true));
            }
            notify(errorMessage, variant);
            return Promise.reject(error);
        }
    );

    return apiService;
};