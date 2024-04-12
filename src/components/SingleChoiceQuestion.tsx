import React, { useState, useEffect } from 'react';
import { Radio, Space, RadioChangeEvent } from 'antd';

type SingleProps = {
  question: string;
  options?: string[];
  onAnswerSelected: (answer: string) => void;
};

const SingleChoiceQuestion: React.FC<SingleProps> = ({
  question,
  options = [],
  onAnswerSelected,
}) => {
  const storedAnswer = localStorage.getItem('singleChoiceAnswer') || '';
  const [selectedOption, setSelectedOption] = useState(storedAnswer);

  useEffect(() => {
    localStorage.setItem('singleChoiceAnswer', selectedOption);
  }, [selectedOption]);

  const handleOptionChange = (e: RadioChangeEvent) => {
    const { value } = e.target;
    setSelectedOption(value);
    onAnswerSelected(value);
  };

  return (
    <div>
      <h3>{question}</h3>
      <Radio.Group onChange={handleOptionChange} value={selectedOption}>
        <Space direction='vertical'>
          {options.map((option, index) => (
            <Radio key={index} value={option}>
              {option}
            </Radio>
          ))}
        </Space>
      </Radio.Group>
    </div>
  );
};

export default SingleChoiceQuestion;
