import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Progress } from 'antd';
import SingleChoiceQuestion from './components/SingleChoiceQuestion';
import MultipleChoiceQuestion from './components/MultipleChoiceQuestion';
import ShortAnswerQuestion from './components/ShortAnswerQuestion';
import LongAnswerQuestion from './components/LongAnswerQuestion';
import { testData, Question } from './testData';
import {
  setQuestions,
  setAnswers,
  setCurrentIndex,
  setTestSubmitted,
  selectSlice,
} from './redux/test/slice';

interface TestComponentProps {
  timeLimitInMinutes: number;
}

const TestComponent: React.FC<TestComponentProps> = ({ timeLimitInMinutes }) => {
  const dispatch = useDispatch();
  const { questions, answers, currentIndex, testSubmitted } = useSelector(selectSlice);
  const [timeRemaining, setTimeRemaining] = useState<number>(() => {
    const savedTime = localStorage.getItem('timeRemaining');
    return savedTime ? parseInt(savedTime, 10) : timeLimitInMinutes * 60;
  });

  let timer: NodeJS.Timeout;

  useEffect(() => {
    dispatch(setQuestions(testData));
  }, []);

  useEffect(() => {
    timer = setInterval(() => {
      setTimeRemaining((prevTime) => {
        const updatedTime = prevTime - 1;
        localStorage.setItem('timeRemaining', updatedTime.toString());

        if (updatedTime <= 0) {
          clearInterval(timer);
        }

        return updatedTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (timeRemaining <= 0) {
      clearInterval(timer);
      localStorage.removeItem('timeRemaining');
    }
  }, [timeRemaining]);

  const handleAnswerSubmitted = (questionId: string, answer: any) => {
    dispatch(
      setAnswers((prevAnswers: Record<string, any>) => ({
        ...prevAnswers,
        [questionId]: answer,
      })),
    );
  };

  const handleNextQuestion = () => {
    dispatch(setCurrentIndex(currentIndex + 1));
  };

  const handleSubmitTest = () => {
    console.log('All answers:', {
      singleChoiceAnswer: localStorage.getItem('singleChoiceAnswer'),
      multipleChoiceAnswers: localStorage.getItem('multipleChoiceAnswers'),
      shortAnswer: localStorage.getItem('shortAnswer'),
      longAnswer: localStorage.getItem('longAnswer'),
    });
    dispatch(setTestSubmitted(true));
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${minutes}:${formattedSeconds}`;
  };

  const progressPercent = ((currentIndex + 1) / questions.length) * 100;

  return (
    <div className='main'>
      <div className='title'>
        <h1>Тестирование</h1>
        <p>{formatTime(timeRemaining)}</p>
      </div>

      <Progress percent={progressPercent} />

      {testSubmitted ? (
        <p>Тест окончен. Спасибо!</p>
      ) : (
        <>
          {renderQuestion(questions[currentIndex])}

          {timeRemaining <= 0 && <p>Время вышло!</p>}

          {currentIndex === questions.length - 1 && (
            <Button onClick={handleSubmitTest}>Отправить тест</Button>
          )}

          {currentIndex < questions.length - 1 && (
            <Button onClick={handleNextQuestion}>Далее</Button>
          )}
        </>
      )}
    </div>
  );
  function renderQuestion(question: Question | undefined) {
    if (!question || !question.type) {
      return null;
    }

    switch (question.type) {
      case 'singleChoice':
        return (
          <SingleChoiceQuestion
            key={question.id}
            question={question.question}
            options={question.options}
            onAnswerSelected={(answer) => handleAnswerSubmitted(question.id.toString(), answer)}
          />
        );
      case 'multipleChoice':
        return (
          <MultipleChoiceQuestion
            key={question.id}
            question={question.question}
            options={question.options}
          />
        );
      case 'shortAnswer':
        return <ShortAnswerQuestion key={question.id} question={question.question} />;
      case 'longAnswer':
        return <LongAnswerQuestion key={question.id} question={question.question} />;
      default:
        return null;
    }
  }
};

export default TestComponent;
