import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ILogin } from '../../../Types/types';
import type { IInitialState } from '../../store.types';

const userRegister = createAsyncThunk<IInitialState, ILogin>('reg', async (reg: ILogin) => {
  try {
    const response = await fetch('http://localhost:3000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(reg),
    });
    const res = (await response.json()) as IInitialState;
    if (response.ok) {
      return res;
    }
    return { status: 'error', error: 'Login failed' } as IInitialState;
  } catch (error) {
    console.error('Oops REG', error);
    return { status: 'error', error: 'An error occurred' } as IInitialState;
  }
});

export default userRegister;
