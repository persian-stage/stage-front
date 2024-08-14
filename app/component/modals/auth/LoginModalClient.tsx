'use client';
import React, { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/app/state/store';
import LoginModal from "@/app/component/modals/auth/LoginModal";

interface ClientComponentProps {
    children: ReactNode;
}

const LoginModalClient: React.FC<ClientComponentProps> = ({ children }) => {
    return <Provider store={store}>
        {children}
        <LoginModal/>
    </Provider>;
};

export default LoginModalClient;