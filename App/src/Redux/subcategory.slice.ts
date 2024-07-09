import { createSlice } from '@reduxjs/toolkit';
import getSubcategory from './thunks/Catalog/subcategoryGet.api';

interface subcategory {
  id: number;
  subcategoryName: string;
  categoryId: number;
}

interface subcategoryState {
  data: subcategory[];
  isLoading: boolean;
  error: string | null;
  status: number | null;
  message: string | null;
}

const initialState: subcategoryState = {
  data: [],
  isLoading: false,
  error: null,
  status: null,
  message: null,
};

const subcategorySlice = createSlice({
  name: 'subcategory',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSubcategory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getSubcategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(getSubcategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Произошла ошибка';
      })
  },
});

export default subcategorySlice.reducer;
