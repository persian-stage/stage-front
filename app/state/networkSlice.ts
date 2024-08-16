import { createSlice } from '@reduxjs/toolkit';
import { NetworkState } from "@/app/interfaces";

const initialState: NetworkState = {
    reTry: false,
    redirect: '',
};

const networkSlice = createSlice({
    name: 'network',
    initialState,
    reducers: {
        setReTry: (state, action) => {
            state.reTry = action.payload;
        },
        setRedirect: (state, action) => {
            state.redirect = action.payload;
        },
    },
});

export const {
    setReTry,
    setRedirect
} = networkSlice.actions;
export default networkSlice.reducer;