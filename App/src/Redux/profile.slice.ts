import { createSlice } from '@reduxjs/toolkit';
import getProfileInfo from './thunks/Profile/profileInfo.api';
import changeProfilePass from './thunks/Profile/profileChangePass.api';
import profileChangeBirthDate from './thunks/Profile/profileChangeBirthDate.api';
import profileChangeFullName from './thunks/Profile/profileChangeFullName.api';
import profileChangeEmail from './thunks/Profile/profileChangeEmail.api';
import profileNotification from './thunks/Profile/profileNotificationUpdate.api';
import profileChangePhoneNumber from './thunks/Profile/profileChangePhoneNumber.api';

interface IUser {
  lastName: string;
  firstName: string;
  middleName: string;
  birthDate: Date | null | string;
  phoneNumber: string | null;
  email: string;
  notificationPush: boolean;
  notificationEmail: boolean;
  isLoading: boolean;
  newEmail: string;
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
  newEmail: '',
  phoneNumber: '',
  notificationPush: false,
  notificationEmail: false,
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
        const {
          lastName,
          firstName,
          middleName,
          birthDate,
          email,
          phoneNumber,
          notificationEmail,
          notificationPush,
          newEmail,
        } = action.payload as {
          lastName: string;
          firstName: string;
          middleName: string;
          birthDate: Date | null | string;
          email: string;
          phoneNumber: string;
          notificationPush: boolean;
          notificationEmail: boolean;
          newEmail: string;
        };
        state.lastName = lastName;
        state.firstName = firstName;
        state.middleName = middleName;
        state.birthDate = birthDate;
        state.email = email;
        state.phoneNumber = phoneNumber;
        state.notificationPush = notificationPush;
        state.newEmail = newEmail;
        state.notificationEmail = notificationEmail;
        console.log('=======>', action.payload);
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
        const { email, newEmail } = action.payload;
        state.email = email;
        state.newEmail = newEmail;
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
      })
      .addCase(profileNotification.pending, (state) => {
        /** */
        state.isLoading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(profileNotification.fulfilled, (state, action) => {
        state.isLoading = false;
        state.notificationPush = action.payload.notificationPush;
        state.notificationEmail = action.payload.notificationEmail;
      })
      .addCase(profileNotification.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(profileChangePhoneNumber.rejected, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(profileChangePhoneNumber.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(profileChangePhoneNumber.fulfilled, (state, action) => {
        state.isLoading = false;
        state.phoneNumber = action.payload.phoneNumber;
        state.successMessage = action.payload.message;
      });
  },
});

export default profileSlice.reducer;
