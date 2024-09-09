'use client';
import { Action, combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer, { logout } from "./authSlice";
import registerReducer from "./registerSlice";
import networkReducer from "./networkSlice";
import commonReducer from "./commonSlice";
import profileAppReducer from "@/app/state/profileApp/profileAppSlice";
import profileCardsReducer from "@/app/state/profileApp/profileCardsSlice";
import registerProfileReducer from "@/app/state/profileApp/registerSlice";
import chatingReducer from "@/app/state/profileApp/chatingSlice";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'auth',
    storage,
    whitelist: ['isUserLoggedIn', 'user'],
};

const appReducer = combineReducers({
    auth: persistReducer(persistConfig, authReducer),
    common: commonReducer,
    register: registerReducer,
    network: networkReducer,
    profileApp: profileAppReducer,
    profileCards: profileCardsReducer,
    chating: chatingReducer,
    registerProfile: registerProfileReducer,
});

const rootReducer = (state: RootState | undefined, action: Action) => {
    if (action.type === logout.type) {
        state = undefined;
    }
    return appReducer(state, action);
};

export const store = configureStore({
    reducer: rootReducer,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof appReducer>;
export type AppDispatch = typeof store.dispatch;