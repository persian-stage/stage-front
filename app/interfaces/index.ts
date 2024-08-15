export interface User {
    email: string;
    id: number;
    name: string;
    avatar: string | null;
    appRegistered: boolean;
}

export interface NetworkState {
    reTry: boolean;
    redirect: string;
}