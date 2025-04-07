import { createSlice } from '@reduxjs/toolkit';
import getQuestions from './thunks/Question/getQuestions.api';
import getAnswers from './thunks/Question/getAnswer.api';

interface Question {
  id: number;
  title: string;
  description: string;
}

interface QuestionState {
  data: Question[];
  isLoading: boolean;
  error: string | null;
  status: number | null;
  message: string | null;
  // answer: Question | null;
}

const initialState: QuestionState = {
  data: [],
  isLoading: false,
  error: null,
  status: null,
  message: null,
  // answer: null,
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
      });
    // .addCase(getAnswers.pending, (state) => {
    //   state.isLoading = true;
    //   state.error = null;
    // })
    // .addCase(getAnswers.fulfilled, (state, action) => {
    //   state.isLoading = false;
    //   state.answer = action.payload;
    // })
    // .addCase(getAnswers.rejected, (state, action) => {
    //   state.isLoading = false;
    //   state.error =
    //     action.error.message || 'Произошла ошибка при открытии акции';
    // });
  },
});

export default questionsSlice.reducer;
