import { createSlice } from '@reduxjs/toolkit';
import getProducts from './thunks/Catalog/productGet.api';
import currentProduct from './thunks/Catalog/getcurrentProduct';

interface Product {
  id: number;
  // article: string;
  productName: string;
  promoStartDate: string;
  promoEndDate: string;
  originalPrice: number;
  customerPrice: number;
  employeePrice: number;
  isNew: boolean;
  isDiscounted: boolean;
  description: string;
  photo: string;
  subcategoryId: number;
  invisible: boolean;
}

interface ProductState {
  postId: number | null;
  data: Product[];
  isLoading: boolean;
  error: string | null;
  status: number | null;
  message: string | null;
  currentProduct: Product | null;
}

const initialState: ProductState = {
  postId: 0,
  data: [],
  isLoading: false,
  error: null,
  status: null,
  message: null,
  currentProduct: null,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Произошла ошибка';
      })
      .addCase(currentProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(currentProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentProduct = action.payload;
      })
      .addCase(currentProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.error.message || 'Произошла ошибка при открытии продукта';
      });
  },
});
export default productSlice.reducer;
