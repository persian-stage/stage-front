'use client';
import { API_ENDPOINTS } from '../config/apiEndpoints';
import { createApiService } from "@/app/utils/apiServiceSetup";

const apiService = createApiService();

export const login = async (email: string, password: string) => {
    const response = await apiService.post(
        API_ENDPOINTS.LOGIN,
        { email, password }
    );
    return response.data;
};

export const register = async (
    email: string,
    password: string,
    firstname: string,
    lastname: string
) => {
    const response = await apiService.post(
        API_ENDPOINTS.REGISTER,
        { email, password, firstname, lastname }
    );
    return response.data;
};

export const logout = async () => {
    await apiService.get(API_ENDPOINTS.LOGOUT);
}

export const getUserData = async () => {
    const response = await apiService.get(API_ENDPOINTS.USER);
    return response.data;
}

export default apiService;