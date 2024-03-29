import { createSlice } from '@reduxjs/toolkit';
import getProducts from './thunks/Products/getProducts.api';
import editProduct from './thunks/Products/editProduct.api';
import deleteProduct from './thunks/Products/deleteProduct.api';
import addProduct from './thunks/Products/addProduct.api';
import deleteProductPhoto from './thunks/Products/deleteProductPhoto.api';
import currentProduct from './thunks/Products/getcurrentProduct';

interface Product {
  id: number;
  article: string;
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
      .addCase(editProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.products;
        state.postId = action.payload.postId;
      })
      .addCase(editProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.error.message || 'Произошла ошибка при редактировании';
      })
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Произошла ошибка при удалении';
      })
      .addCase(addProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.products;
        state.postId = action.payload.postId;
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Произошла ошибка при добавлении';
      })
      .addCase(deleteProductPhoto.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteProductPhoto.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(deleteProductPhoto.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.error.message || 'Произошла ошибка при удалении изображения';
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
