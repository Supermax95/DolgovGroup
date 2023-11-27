import { createSlice } from '@reduxjs/toolkit';
import getSubcategory from './thunks/SubCategory/getSubcategory.api';
import editSubcategory from './thunks/SubCategory/editSubcategory.api';
import deleteSubcategory from './thunks/SubCategory/deleteSubcategory.api';
import addSubcategory from './thunks/SubCategory/addSubcategory.api';

interface subcategory {
  id: number;
  subcategoryName: string;
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
      .addCase(editSubcategory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(editSubcategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(editSubcategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.error.message || 'Произошла ошибка при редактировании';
      })
      .addCase(deleteSubcategory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteSubcategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(deleteSubcategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Произошла ошибка при удалении';
      })
      .addCase(addSubcategory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addSubcategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(addSubcategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Произошла ошибка при добавлении';
      });
  },
});

export default subcategorySlice.reducer;
