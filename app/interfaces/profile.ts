export interface Profile {
    id: string;
    name: string;
    age: number;
    connected: boolean;
    liked: boolean;
    country: string;
    city: string;
    interested: boolean;
    married: boolean;
    lastTimeActive: string;
    avatar: string;
    images: string[];
    ageLookingFor: number[];
    height: number;
    hasKids: boolean;
    wantsKids: string;
    religion: string;
    interests: string[];
}

export interface ProfileCard {
    id: string;
    name: string;
    age: number;
    connected: boolean;
    liked: boolean;
    country: string;
    city: string;
    interested: boolean;
    avatar: string;
}

export interface DateOfBirth {
    day: number;
    month: number;
    year: number;
}

export interface RegisterProfileState {
    lookingForwardToGender: string;
    gender: string;
    dateOfBirth: DateOfBirth;
    country: string;
    city: string;
    profileUsername: string;
    errors?: string[];
}