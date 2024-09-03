'use client';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChatHistoryList } from "@/app/interfaces";

const initialState: ChatHistoryList = {
    chatHistory: null,
};

const chatingSlice = createSlice({
    name: 'chating',
    initialState,
    reducers: {
        setChatHistory: (state, action: PayloadAction<any>) => {
            state.chatHistory = action.payload;
        },
    }
});

export const {
    setChatHistory
} = chatingSlice.actions;

export default chatingSlice.reducer;
