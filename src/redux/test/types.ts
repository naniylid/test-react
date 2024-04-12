import { Question } from '../../testData';

export interface SliceState {
  questions: Question[];
  answers: Record<string, any>;
  currentIndex: number;
  testSubmitted: boolean;
}
