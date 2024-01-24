import { createSlice } from '@reduxjs/toolkit';
import getProfileInfo from './thunks/Profile/profileInfo.api';
import changeProfilePass from './thunks/Profile/profileChangePass.api';
import profileChangeBirthDate from './thunks/Profile/profileChangeBirthDate.api';
import profileChangeFullName from './thunks/Profile/profileChangeFullName.api';
import profileChangeEmail from './thunks/Profile/profileChangeEmail.api';

interface IUser {
  lastName: string;
  firstName: string;
  middleName: string;
  birthDate: Date | null | string;
  email: string;
  isLoading: boolean;
  error: any; //* указать конкретный тип для ошибок, если он известен
  successMessage: any; //* указать конкретный тип для ошибок, если он известен
  // error?: string | null;
  // successMessage?: string | null;
}

const initialState: IUser = {
  lastName: '',
  firstName: '',
  middleName: '',
  birthDate: null || '',
  email: '',
  isLoading: false,
  error: null,
  successMessage: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProfileInfo.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getProfileInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        const { lastName, firstName, middleName, birthDate, email } =
          action.payload as {
            lastName: string;
            firstName: string;
            middleName: string;
            birthDate: Date | null | string;
            email: string;
          };
        state.lastName = lastName;
        state.firstName = firstName;
        state.middleName = middleName;
        state.birthDate = birthDate;
        state.email = email;
      })
      .addCase(getProfileInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(profileChangeFullName.pending, (state) => {
        /** Fullname */
        state.isLoading = true;
        state.error = null;
      })
      .addCase(profileChangeFullName.fulfilled, (state, action) => {
        state.isLoading = false;
        const { lastName, firstName, middleName } = action.payload;
        state.lastName = lastName;
        state.firstName = firstName;
        state.middleName = middleName;
      })
      .addCase(profileChangeFullName.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(profileChangeBirthDate.pending, (state) => {
        /** birth */
        state.isLoading = true;
        state.error = null;
      })
      .addCase(profileChangeBirthDate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.birthDate = action.payload.birthDate;
      })
      .addCase(profileChangeBirthDate.rejected, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(profileChangeEmail.pending, (state) => {
        /** email */
        state.isLoading = true;
        state.error = null;
      })
      .addCase(profileChangeEmail.fulfilled, (state, action) => {
        state.isLoading = false;
        const { email } = action.payload;
        state.email = email;
      })
      .addCase(profileChangeEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(changeProfilePass.pending, (state) => {
        /** */
        state.isLoading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(changeProfilePass.fulfilled, (state, action) => {
        state.isLoading = false;
        state.successMessage = action.payload.message;
      })
      .addCase(changeProfilePass.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default profileSlice.reducer;
