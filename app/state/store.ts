'use client';
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import registerReducer from "./registerSlice";
import networkReducer from "./networkSlice";
import commonReducer from "./commonSlice";
import profileAppReducer from "@/app/state/profileApp/profileAppSlice";
import profileCardsReducer from "@/app/state/profileApp/profileCardsSlice";
import registerProfileReducer from "@/app/state/profileApp/registerSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        common: commonReducer,
        register: registerReducer,
        network: networkReducer,
        profileApp: profileAppReducer,
        profileCards: profileCardsReducer,
        registerProfile: registerProfileReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;