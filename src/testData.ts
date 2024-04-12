export type Question = {
  id: number;
  type: string;
  question: string;
  options?: string[];
};

export const testData: Question[] = [
  {
    id: 1,
    type: 'singleChoice',
    question: 'Столица Франции?',
    options: ['Париж', 'Лондон', 'Берлин', 'Мадрид'],
  },
  {
    id: 2,
    type: 'multipleChoice',
    question: 'Какие цвета есть у радуги',
    options: ['Красный', 'Зеленый', 'Голубой', 'Желтый', 'Фиолетовый', 'Белый'],
  },
  {
    id: 3,
    type: 'shortAnswer',
    question: 'Кто автор "Горе от ума"?',
  },
  {
    id: 4,
    type: 'longAnswer',
    question: 'Расскажите о своем опыте работы',
  },
];
