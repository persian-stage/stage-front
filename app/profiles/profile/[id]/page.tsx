import * as React from 'react';
import Profile from "@/app/component/profiles/Profile";

interface Params {
    id: string;
}

interface Props {
    params: Params;
}
export default function ProfilesProfile({ params }: Props) {
    const { id } = params;

    return (
        <>
            <Profile profileId={id}/>
        </>
    );
}
