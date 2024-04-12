import React, { useState, useEffect, ChangeEvent } from 'react';
import { Input } from 'antd';

type ShortProps = {
  question: string;
};

const ShortAnswerQuestion: React.FC<ShortProps> = ({ question }) => {
  const storedAnswer = localStorage.getItem('shortAnswer') || '';
  const [answer, setAnswer] = useState(storedAnswer);

  useEffect(() => {
    localStorage.setItem('shortAnswer', answer);
  }, [answer]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAnswer(e.target.value);
  };

  return (
    <div>
      <h3>{question}</h3>
      <Input value={answer} onChange={handleInputChange} />
    </div>
  );
};

export default ShortAnswerQuestion;
