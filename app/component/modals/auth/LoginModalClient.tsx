'use client';
import React, { ReactNode, useEffect } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState, store } from '@/app/state/store';
import LoginModal from "@/app/component/modals/auth/LoginModal";
import { useRouter, usePathname } from "next/navigation";
import { checkUserAuthentication } from "@/app/state/authSlice";

interface ClientComponentProps {
    children: ReactNode;
}

const LoginModalClient: React.FC<ClientComponentProps> = ({ children }) => {

    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const isUserLoggedIn = useSelector((state: RootState) => state.auth.isUserLoggedIn);
    const pathname = usePathname();

    useEffect(() => {
        dispatch(checkUserAuthentication());
    }, [dispatch]);

    useEffect(() => {
        if (!isUserLoggedIn) {
            router.push('/');
        }
    }, [isUserLoggedIn, pathname, router]);

    return <Provider store={store}>
        {children}
        <LoginModal/>
    </Provider>;
};

export default LoginModalClient;