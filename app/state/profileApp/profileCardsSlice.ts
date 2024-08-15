'use client';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setLoading } from "@/app/state/generalSlice";
import { fetchProfileCards } from "@/app/services/profileApiService";
import { AppDispatch } from "@/app/state/store";
import { ProfileCard } from "@/app/interfaces/profile";

interface ProfileAppState {
    isProfileAppRegistered: boolean;
    profileCards: ProfileCard[];
    error: string | null;
}

const initialState: ProfileAppState = {
    isProfileAppRegistered: false,
    profileCards: [],
    error: null,
};

const profileCardsSlice = createSlice({
    name: 'profileApp',
    initialState,
    reducers: {
        setProfileAppRegistered(state, action: PayloadAction<boolean>) {
            state.isProfileAppRegistered = action.payload;
        },
        setProfileCards(state, action: PayloadAction<ProfileCard[]>) {
            state.profileCards = action.payload;
        },
        setError(state, action: PayloadAction<string | null>) {
            state.error = action.payload;
        },
    },
});

export const { setProfileAppRegistered, setProfileCards, setError } = profileCardsSlice.actions;

export const getProfileCards = () => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
        const response = await fetchProfileCards();
        dispatch(setProfileCards(response.profiles));
    } catch (error) {
        dispatch(setError((error as Error).message));
    } finally {
        dispatch(setLoading(false));
    }
}

export default profileCardsSlice.reducer;