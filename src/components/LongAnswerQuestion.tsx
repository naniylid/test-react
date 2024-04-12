import React, { useState, useEffect, ChangeEvent } from 'react';
import { Input } from 'antd';

const { TextArea } = Input;

type LongProps = {
  question: string;
};

const LongAnswerQuestion: React.FC<LongProps> = ({ question }) => {
  const storedAnswer = localStorage.getItem('longAnswer') || '';
  const [answer, setAnswer] = useState(storedAnswer);

  useEffect(() => {
    localStorage.setItem('longAnswer', answer);
  }, [answer]);

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setAnswer(e.target.value);
  };

  return (
    <div>
      <h3>{question}</h3>
      <TextArea rows={4} cols={50} value={answer} onChange={handleInputChange} />
    </div>
  );
};

export default LongAnswerQuestion;
