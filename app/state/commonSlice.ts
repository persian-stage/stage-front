import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CommonState {
    loading: boolean;
}

const initialState: CommonState = {
    loading: false,
};

const commonSlice = createSlice({
    name: 'general',
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
    },
});

export const { setLoading } = commonSlice.actions;
export default commonSlice.reducer;