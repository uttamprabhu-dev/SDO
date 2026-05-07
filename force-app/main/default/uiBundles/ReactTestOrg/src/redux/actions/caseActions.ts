import { createAsyncThunk } from '@reduxjs/toolkit';
import { getCases } from '../../api/cases/caseService';

export const fetchCases = createAsyncThunk('cases/fetchAll', async () => {
    return await getCases();
});
