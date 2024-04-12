import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { SliceState } from './types';
import { Question } from '../../testData';

const initialState: SliceState = {
  questions: [],
  answers: {},
  currentIndex: 0,
  testSubmitted: false,
};

const testSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    setQuestions(state, action: PayloadAction<Question[]>) {
      state.questions = action.payload;
    },
    setAnswers(state, action: PayloadAction<Record<string, any>>) {
      state.answers = action.payload;
    },
    setCurrentIndex(state, action: PayloadAction<number>) {
      state.currentIndex = action.payload;
    },
    setTestSubmitted(state, action: PayloadAction<boolean>) {
      state.testSubmitted = action.payload;
    },
  },
});

export const { setQuestions, setAnswers, setCurrentIndex, setTestSubmitted } = testSlice.actions;
export const selectSlice = (state: RootState) => state.testSlice;

export default testSlice.reducer;
