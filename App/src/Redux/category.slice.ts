import { createSlice } from '@reduxjs/toolkit';
import getCategory from './thunks/Catalog/categoryGet.api';


interface Category {
  id: number;
  categoryName: string;
  img: string;
}

interface CategoryState {
  data: Category[];
  isLoading: boolean;
  error: string | null;
  status: number | null;
  message: string | null;
}

const initialState: CategoryState = {
  data: [],
  isLoading: false,
  error: null,
  status: null,
  message: null,
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(getCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Произошла ошибка';
      });
    },
    });

    export default categorySlice.reducer;