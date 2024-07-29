'use client';
import {createContext, useState, useContext, Dispatch, SetStateAction} from 'react';

interface User {
    avatar: string;
    id: number;
    name: string;
    email: string;
}
export interface State {
    user: User | null;
    reTry: boolean;
}
export interface GlobalContextType {
    state: State;
    setState: Dispatch<SetStateAction<State>>;
}

const defaultContextValue: GlobalContextType = {
    state: { user: null, reTry: false},
    setState: () => {}
};

const GlobalContext = createContext(defaultContextValue);

export const GlobalProvider = ({ children }: Readonly<{
    children: React.ReactNode;
}>) => {
    const [state, setState]: [State, Dispatch<SetStateAction<State>>] = useState<State>({reTry: false, user: null });

    return (
        <GlobalContext.Provider value={{ state, setState }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => useContext(GlobalContext);