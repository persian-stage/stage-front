'use client';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setLoading } from "@/app/state/commonSlice";
import { fetchProfile } from "@/app/services/profileApiService";
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
        }
    },
});

export const { setProfileAppRegistered, setProfile } = profileAppSlice.actions;

export const getProfile = (profileId: string) => async (dispatch: AppDispatch) => {
    store.dispatch(setLoading(true));
    try {
        const response = await fetchProfile(profileId);
        store.dispatch(setProfile(response.profile));
    } catch (error) {
        store.dispatch(setError((error as Error).message));
    } finally {
        store.dispatch(setLoading(false));
    }
}

export default profileAppSlice.reducer;