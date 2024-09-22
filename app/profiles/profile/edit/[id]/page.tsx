import * as React from 'react';
import Profile from "@/app/component/profiles/Profile";

interface Params {
    id: string;
}

interface Props {
    params: Params;
}
export default function EditProfile({ params }: Props) {

    return (
        <Profile edit={true} profileId={params.id}/>
    );
}
