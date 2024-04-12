import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import testSlice from './test/slice';

export const store = configureStore({
  reducer: {
    testSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
