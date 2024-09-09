'use client';
import React from 'react';
import { Provider } from 'react-redux';
import { persistor, store } from '@/app/state/store';
import { PersistGate } from "redux-persist/integration/react";

const ClientProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            {children}
        </PersistGate>
    </Provider>;
};

export default ClientProvider;