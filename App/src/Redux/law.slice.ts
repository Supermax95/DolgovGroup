import { createSlice } from '@reduxjs/toolkit';
import getLaws from './thunks/Law/getLaws.api';
import currentLaw from './thunks/Law/getCurrentLaw.api';

interface Law {
  id: number;
  title: string;
  description: string;
  dateFrom: string;
  documentLink: string;
  updatedAt: Date;
}

interface LawState {
  postId: number | null;
  data: Law[];
  isLoading: boolean;
  error: string | null;
  status: number | null;
  message: string | null;
  currentLaw: Law | null;
}

const initialState: LawState = {
  postId: 0,
  data: [],
  isLoading: false,
  error: null,
  status: null,
  message: null,
  currentLaw: null,
};

const lawSlice = createSlice({
  name: 'laws',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLaws.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getLaws.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(getLaws.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Произошла ошибка';
      })
      .addCase(currentLaw.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(currentLaw.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentLaw = action.payload;
        console.log('======>', state.currentLaw);
      })
      .addCase(currentLaw.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.error.message ||
          'Произошла ошибка при открытии правового документа';
      });
  },
});

export default lawSlice.reducer;
