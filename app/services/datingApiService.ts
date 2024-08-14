'use client';
import { DATING_API_ENDPOINTS } from '../config/datingApiEndpoints';
import { createApiService } from "@/app/utils/apiServiceSetup";

const datingApiService = createApiService();

export const fetchProfiles = async () => {
    const response = await datingApiService.get(DATING_API_ENDPOINTS.FETCH_PROFILES);
    return response.data;
};

export const fetchProfile = async (profileId: string) => {
    const response = await datingApiService.get(`${DATING_API_ENDPOINTS.FETCH_PROFILE}/${profileId}`);
    return response.data;
};

export default datingApiService;