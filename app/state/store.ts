'use client';
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import registerReducer from "./registerSlice";
import networkReducer from "./networkSlice";
import generalReducer from "./generalSlice";
import profileAppReducer from "@/app/state/profileApp/profileAppSlice";
import profileCardsReducer from "@/app/state/profileApp/profileCardsSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        general: generalReducer,
        register: registerReducer,
        network: networkReducer,
        profileApp: profileAppReducer,
        profileCards: profileCardsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;