'use client';
import * as React from 'react';
import { useSelector } from "react-redux";
import { RootState } from "@/app/state/store";
import Profile from "@/app/component/profiles/Profile";

export default function EditProfile() {
    const { user } = useSelector((state: RootState) => state.auth);

    return (
        <Profile edit={true} profileId={user ? user.id + '' : '0'}/>
    );
}
