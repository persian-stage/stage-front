'use client';
import { API_ENDPOINTS } from '../config/apiEndpoints';
import { createApiService } from "@/app/utils/apiServiceSetup";

const apiService = createApiService();

export const getCities = async (country: string) => {
    const response = await apiService.get(
        `${API_ENDPOINTS.CITIES}?country=${country}`
    );
    return response.data;
}