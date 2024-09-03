import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CommonState {
    loading: boolean;
    isNewMessage: boolean;
}

const initialState: CommonState = {
    loading: false,
    isNewMessage: false,
};

const commonSlice = createSlice({
    name: 'general',
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setIsNewMessage: (state, action: PayloadAction<boolean>) => {
            state.isNewMessage = action.payload;
        },
    },
});

export const { setLoading, setIsNewMessage } = commonSlice.actions;
export default commonSlice.reducer;