export interface User {
    email: string;
    id: number;
    name: string;
    avatar: string | null;
    appsRegistered: [];
    avatarUrl?: string;
}

export interface ErrorMessage {
    formName?: string;
    field: string;
    errorMessage: string;
}

export interface RegisterProfileErrorState {
    errors: ErrorMessage[];
}

export interface NetworkState {
    reTry: boolean;
    redirectTo: string;
}

export interface Country {
    label: string;
}

export interface City {
    label: string;
}