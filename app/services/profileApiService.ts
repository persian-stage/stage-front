'use client';
import { PROFILES_API_ENDPOINTS } from '../config/profilesApiEndpoints';
import { createApiService } from "@/app/utils/apiServiceSetup";

const profileApiService = createApiService();

export const fetchProfileCards = async () => {
    const response = await profileApiService.get(PROFILES_API_ENDPOINTS.FETCH_PROFILE_CARDS);
    return response.data;
};

export const fetchProfile = async (profileId: string) => {
    const response = await profileApiService.get(`${PROFILES_API_ENDPOINTS.FETCH_PROFILE}/${profileId}`);
    return response.data;
};

export default profileApiService;