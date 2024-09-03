'use client';
import { API_ENDPOINTS } from '../config/apiEndpoints';
import { apiService } from "@/app/utils/apiServiceSetup";

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

export const uploadAvatar = async (avatar: File) => {
    const formData = new FormData();
    formData.append('file', avatar);
    const response = await apiService.post(
        API_ENDPOINTS.UPLOAD_AVATAR,
        formData,
        {
            headers: {
                'Content-Type': undefined,
            },
            withCredentials: true,
            maxContentLength: 50 * 1024 * 1024, // 50MB
            maxBodyLength: 50 * 1024 * 1024, // 50MB
        }
    );
    return response.data;
};

export const getUserDataWithId = async (userId: string) => {
    const response = await apiService.get(API_ENDPOINTS.USER + userId);
    return response.data;
}

export const fetchChatHistoryList = async () => {
    const response = await apiService.get(API_ENDPOINTS.CHATS_HISTORY_LIST);
    return response.data;
};

export default apiService;