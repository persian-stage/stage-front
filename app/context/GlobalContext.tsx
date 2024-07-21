'use client';
import { createContext, useState, useContext } from 'react';

interface User {
    avatar: string;
    id: number;
    name: string;
    email: string;
}
interface State {
    user: User | null;
}
interface GlobalContextType {
    state: State;
    setState: (State: State) => void;
}

const defaultContextValue: GlobalContextType = {
    state: { user: null },
    setState: () => {}
};

const GlobalContext = createContext(defaultContextValue);

export const GlobalProvider = ({ children }: Readonly<{
    children: React.ReactNode;
}>) => {
    const [state, setState] = useState<State>({ user: null });

    return (
        <GlobalContext.Provider value={{ state, setState }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => useContext(GlobalContext);