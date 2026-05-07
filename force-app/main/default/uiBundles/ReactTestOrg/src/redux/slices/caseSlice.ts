import { createSlice } from '@reduxjs/toolkit';
import { CaseNode } from '../../api/cases/caseService';
import { fetchCases } from '../actions/caseActions';

interface CaseState {
    cases: CaseNode[];
    totalCount: number;
    loading: boolean;
    error: string | null;
}

const initialState: CaseState = {
    cases: [],
    totalCount: 0,
    loading: false,
    error: null,
};

export const caseSlice = createSlice({
    name: 'cases',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCases.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCases.fulfilled, (state, action) => {
                state.loading = false;
                state.cases = action.payload.cases;
                state.totalCount = action.payload.totalCount;
            })
            .addCase(fetchCases.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? 'Failed to load cases.';
            });
    },
});

export default caseSlice.reducer;
