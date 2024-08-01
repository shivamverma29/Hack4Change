import { configureStore } from '@reduxjs/toolkit';
import languageReducer from '../slices/languageSlice';
import authReducer from '../slices/authSlice'

export const store = configureStore({
  reducer: {
    lang: languageReducer,
    auth: authReducer,
  },
});
