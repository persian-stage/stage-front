export interface User {
    email: string;
    id: number;
    name: string;
    avatar: string | null;
    appsRegistered: [];
}

export interface NetworkState {
    reTry: boolean;
    redirect: string;
}

export interface Country {
    label: string;
}

export interface City {
    name: string;
}