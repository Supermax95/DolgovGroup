import { createAsyncThunk } from '@reduxjs/toolkit';
import AuthService from '../../!!Services/AuthService'; 


export const logout = createAsyncThunk('auth/logout', async () => {
  try {
    await AuthService.logout();
    localStorage.removeItem('token');
  } catch (error) {
    throw error.response?.data?.message || 'Произошла ошибка выхода';
  }
});
