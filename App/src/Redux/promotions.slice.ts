import { createSlice } from '@reduxjs/toolkit';
import getPromotions from './thunks/Promotion/getPromotion.api';
import currentPromotion from './thunks/Promotion/getcurrentPromotion.api';

interface Promotion {
  id: number;
  title: string;
  description: string;
  dateStart: string;
  dateEnd: string;
  photo?: string;
  carousel: boolean;
  invisible: boolean;
}

interface PromotionState {
  postId: number | null;
  data: Promotion[];
  isLoading: boolean;
  error: string | null;
  status: number | null;
  message: string | null;
  currentPromotion: Promotion | null;
}

const initialState: PromotionState = {
  postId: 0,
  data: [],
  isLoading: false,
  error: null,
  status: null,
  message: null,
  currentPromotion: null,
};

const promotionSlice = createSlice({
  name: 'promotions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPromotions.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getPromotions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(getPromotions.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Произошла ошибка';
      })
      .addCase(currentPromotion.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(currentPromotion.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentPromotion = action.payload;
      })
      .addCase(currentPromotion.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.error.message || 'Произошла ошибка при открытии акции';
      });
  },
});

export default promotionSlice.reducer;
