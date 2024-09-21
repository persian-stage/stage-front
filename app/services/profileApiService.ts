'use client';
import { PROFILES_API_ENDPOINTS } from '../config/profilesApiEndpoints';
import { apiService } from "@/app/utils/apiServiceSetup";
import { API_ENDPOINTS } from "@/app/config/apiEndpoints";

export const fetchProfileCards = async () => {
    const response = await apiService.get(PROFILES_API_ENDPOINTS.FETCH_PROFILE_CARDS);
    return response.data;
};

export const fetchProfile = async (profileId: string) => {
    const response = await apiService.get(`${PROFILES_API_ENDPOINTS.FETCH_PROFILE}${profileId}`);
    return response.data;
};

export const registerProfile = async (profileData: any) => {
    const response = await apiService.post(PROFILES_API_ENDPOINTS.REGISTER_PROFILE, profileData);
    return response.data;
};

export const uploadImage = async (image: File) => {
    const formData = new FormData();
    formData.append('file', image);
    const response = await apiService.post(
        API_ENDPOINTS.UPLOAD_IMAGE_FOR_GALLERY,
        formData,
        {
            headers: {
                'Content-Type': undefined,
            },
            withCredentials: true,
        }
    );
    return response.data;
};

export const deleteProfileImage = async (imgFileName: string) => {
    const response = await apiService.delete(
        PROFILES_API_ENDPOINTS.PROFILE_IMAGE_DELETE + imgFileName ?? '');
    return response.data;
}

export const fetchProfileImages = async (profileId: string) => {
    const response = await apiService.get(PROFILES_API_ENDPOINTS.PROFILE_IMAGES + profileId);
    return response.data;
};

export const fetchProfileData = async (profileId: string) => {
    const response = await apiService.get(PROFILES_API_ENDPOINTS.PROFILE_IMAGES + profileId);
    return response.data;
};
