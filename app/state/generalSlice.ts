import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GeneralState {
    loading: boolean;
}

const initialState: GeneralState = {
    loading: false,
};

const generalSlice = createSlice({
    name: 'general',
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
    },
});

export const { setLoading } = generalSlice.actions;
export default generalSlice.reducer;