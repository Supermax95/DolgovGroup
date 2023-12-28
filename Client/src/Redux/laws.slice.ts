import { createSlice } from '@reduxjs/toolkit';
import addLaw from "./thunks/Document/addLaw.api";
import deleteLaw from "./thunks/Document/deleteLaw.api";
import editLaw from "./thunks/Document/editLaw.api";
import getLaws from "./thunks/Document/getLaws.api";
import deleteDocumentLaw from './thunks/Document/deleteDocumentLaw.api';

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
  }


const initialState: LawState = {
    postId: 0,
    data: [],
    isLoading: false,
    error: null,
    status: null,
    message: null,
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
        .addCase(editLaw.pending, (state) => {
          state.isLoading = true;
          state.error = null;
        })
        .addCase(editLaw.fulfilled, (state, action) => {
          state.isLoading = false;
          state.data = action.payload.laws;
          state.postId = action.payload.postId;
        })
        .addCase(editLaw.rejected, (state, action) => {
          state.isLoading = false;
          state.error =
            action.error.message || 'Произошла ошибка при редактировании';
        })
        .addCase(deleteLaw.pending, (state) => {
          state.isLoading = true;
          state.error = null;
        })
        .addCase(deleteLaw.fulfilled, (state, action) => {
          state.isLoading = false;
          state.data = action.payload;
        })
        .addCase(deleteLaw.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.error.message || 'Произошла ошибка при удалении';
        })
        .addCase(addLaw.pending, (state) => {
          state.isLoading = true;
          state.error = null;
        })
        .addCase(addLaw.fulfilled, (state, action) => {
          state.isLoading = false;
          state.data = action.payload.laws;
          state.postId = action.payload.postId;
        })
        .addCase(addLaw.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.error.message || 'Произошла ошибка при добавлении';
        })
        .addCase(deleteDocumentLaw.pending, (state) => {
          state.isLoading = true;
          state.error = null;
        })
        .addCase(deleteDocumentLaw.fulfilled, (state, action) => {
          state.isLoading = false;
          state.data = action.payload;
        })
        .addCase(deleteDocumentLaw.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.error.message || 'Произошла ошибка при удалении файла';
        });
    },
  });
  
  export default lawSlice.reducer;
  