'use client';
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setLoading } from "@/app/state/commonSlice";
import {
    fetchProfile,
    fetchProfileImages,
    deleteProfileImage as deleteProfileImageService,
    uploadImage as uploadImageService
} from "@/app/services/profileApiService";
import { AppDispatch, store } from "@/app/state/store";
import { Profile } from "@/app/interfaces/profile";
import { setError } from "@/app/state/profileApp/profileCardsSlice";

interface ProfileAppState {
    isProfileAppRegistered: boolean;
    profile: Profile;
}

const initialState: ProfileAppState = {
    isProfileAppRegistered: false,
    profile: {
        id: '',
        name: '',
        age: 0,
        interested: false,
        connected: false,
        liked: false,
        country: '',
        city: '',
        married: false,
        lastTimeActive: '',
        avatar: '',
        images: [],
        ageLookingFor: [],
        height: 0,
        hasKids: false,
        wantsKids: '',
        religion: '',
        interests: [],
    }
};

const profileAppSlice = createSlice({
    name: 'profileApp',
    initialState,
    reducers: {
        setProfileAppRegistered(state, action: PayloadAction<boolean>) {
            state.isProfileAppRegistered = action.payload;
        },
        setProfile(state, action: PayloadAction<Profile>) {
            state.profile = action.payload;
        },
        setImage(state, action: PayloadAction<string[]>) {
            state.profile.images = action.payload;
        }
    },
});

export const uploadImage = createAsyncThunk(
    'profile/uploadImage',
    async (image: File, { dispatch }) => {
        store.dispatch(setLoading(true));
        try {
            const response = await uploadImageService(image);
            if (response.data.images !== null) {
                store.dispatch(setImage(response.data.images));
            }
            // store.dispatch(setAvatarMode(false));
            // store.dispatch(setIsUserLoggedIn(true));
            // store.dispatch(checkUserAuthentication());
            // Handle successful upload (e.g., update state with new avatar URL)
            return response.avatarUrl;
        } catch (error) {
            // Handle error (e.g., dispatch setErrors)
            throw error;
        } finally {
            store.dispatch(setLoading(false));
        }
    }
);

export const loadProfileImages = (profileId: string) => async (dispatch: AppDispatch) => {
    store.dispatch(setLoading(true));
    try {
        const response = await fetchProfileImages(profileId);
        if (response.data.images !== null) {
            store.dispatch(setImage(response.data.images));
        }
    } catch (error) {
        store.dispatch(setError((error as Error).message));
        store.dispatch(setLoading(false));
    } finally {
        store.dispatch(setLoading(false));
    }
}

export const deleteProfileImage = (profileId: string, imgFileName: string) => async (dispatch: AppDispatch) => {
    store.dispatch(setLoading(true));
    try {
        const response = await deleteProfileImageService(imgFileName);
        if (response.data.status === '200') {
            store.dispatch(getProfile(profileId));
        }
    } catch (error) {
        store.dispatch(setError((error as Error).message));
        store.dispatch(setLoading(false));
    } finally {
        store.dispatch(setLoading(false));
    }
}

export const { setProfileAppRegistered, setProfile, setImage } = profileAppSlice.actions;

export const getProfile = (profileId: string) => async (dispatch: AppDispatch) => {
    store.dispatch(setLoading(true));
    try {
        const response = await fetchProfile(profileId);
        if (response.data.profile !== null) {
            store.dispatch(setProfile(response.data.profile));
        }
    } catch (error) {
        store.dispatch(setError((error as Error).message));
    } finally {
        store.dispatch(setLoading(false));
    }
}

export default profileAppSlice.reducer;