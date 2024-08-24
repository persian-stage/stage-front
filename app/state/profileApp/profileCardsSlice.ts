'use client';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setLoading } from "@/app/state/commonSlice";
import { fetchProfileCards } from "@/app/services/profileApiService";
import { AppDispatch, store } from "@/app/state/store";
import { ProfileCard } from "@/app/interfaces/profile";

interface ProfileAppState {
    profileCards: ProfileCard[];
    error: string | null;
}

const initialState: ProfileAppState = {
    profileCards: [],
    error: null,
};

const profileCardsSlice = createSlice({
    name: 'profileCards',
    initialState,
    reducers: {
        setProfileCards(state, action: PayloadAction<ProfileCard[]>) {
            state.profileCards = action.payload;
        },
        setError(state, action: PayloadAction<string | null>) {
            state.error = action.payload;
        },
    },
});

export const { setProfileCards, setError } = profileCardsSlice.actions;

export const getProfileCards = () => async (dispatch: AppDispatch) => {
    store.dispatch(setLoading(true));
    try {
        const response = await fetchProfileCards();
        if (response.profiles.length > 0) {
            store.dispatch(setProfileCards(response.profiles));
        }
    } catch (error) {
        store.dispatch(setError((error as Error).message));
        store.dispatch(setLoading(false));
    } finally {
        store.dispatch(setLoading(false));
    }
}

export default profileCardsSlice.reducer;