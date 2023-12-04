import { createSlice } from '@reduxjs/toolkit';
import getPromotions from './thunks/Promotion/getPromotion.api';
import editPromotion from './thunks/Promotion/editPromotion.api';
import deletePromotion from './thunks/Promotion/deletePromotion.api';
import addPromotion from './thunks/Promotion/addPromotion.api';


interface Promotion {
    id: number;
    title: string;
    description: string;
    dateStart: string;
    dateEnd: string;
    carousel: boolean;
    visible: boolean;
  };

interface PromotionState {
  postId: number | null;
  data: Promotion[];
  isLoading: boolean;
  error: string | null;
  status: number | null;
  message: string | null;
}

const initialState: PromotionState = {
  postId: 0,
  data: [],
  isLoading: false,
  error: null,
  status: null,
  message: null,
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
        //console.log('action.payload prod', action.payload);
      })
      .addCase(getPromotions.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Произошла ошибка';
      })
      .addCase(editPromotion.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(editPromotion.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.promotions;
        state.postId = action.payload.postId;
        console.log('state.data ', state.data);
      })
      .addCase(editPromotion.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.error.message || 'Произошла ошибка при редактировании';
      })
      .addCase(deletePromotion.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deletePromotion.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(deletePromotion.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Произошла ошибка при удалении';
      })
      .addCase(addPromotion.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addPromotion.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.promotions;
        state.postId = action.payload.postId;
        console.log('state.data', state.data);
      })
      .addCase(addPromotion.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Произошла ошибка при добавлении';
      });
  },
});

export default promotionSlice.reducer;
