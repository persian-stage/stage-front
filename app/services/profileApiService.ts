'use client';
import { PROFILES_API_ENDPOINTS } from '../config/profilesApiEndpoints';
import { apiService } from "@/app/utils/apiServiceSetup";

export const fetchProfileCards = async () => {
    const response = await apiService.get(PROFILES_API_ENDPOINTS.FETCH_PROFILE_CARDS);
    return response.data;
};

export const fetchProfile = async (profileId: string) => {
    const response = await apiService.get(`${PROFILES_API_ENDPOINTS.FETCH_PROFILE}/${profileId}`);
    return response.data;
};

export const registerProfile = async (profileData: any) => {
    const response = await apiService.post(PROFILES_API_ENDPOINTS.REGISTER_PROFILE, profileData);
    return response.data;
};
