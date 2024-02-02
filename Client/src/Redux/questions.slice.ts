import { createSlice } from '@reduxjs/toolkit';
import getQuestions from './thunks/Question/getQuestions.api';
import editQuestion from './thunks/Question/editQuestion.api';
import deleteQuestion from './thunks/Question/deleteQuestion.api';
import newQuestion from './thunks/Question/newQuestion.api';

interface Question {
  id: number;
  title: string;
  description: string;
  updatedAt: Date;
}

interface QuestionState {
  data: Question[];
  isLoading: boolean;
  error: string | null;
  status: number | null;
  message: string | null;
}

const initialState: QuestionState = {
  data: [],
  isLoading: false,
  error: null,
  status: null,
  message: null,
};

const questionsSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getQuestions.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getQuestions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(getQuestions.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Произошла ошибка';
      })
      .addCase(editQuestion.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(editQuestion.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(editQuestion.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.error.message || 'Произошла ошибка при редактировании';
      })
      .addCase(deleteQuestion.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteQuestion.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(deleteQuestion.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Произошла ошибка при удалении';
      })
      .addCase(newQuestion.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(newQuestion.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(newQuestion.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Произошла ошибка при добавлении';
      });
  },
});

export default questionsSlice.reducer;
