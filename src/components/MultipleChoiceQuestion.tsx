import React, { useState, useEffect } from 'react';
import { Checkbox } from 'antd';

type MultipleProps = {
  question: string;
  options?: string[];
};

const MultipleChoiceQuestion: React.FC<MultipleProps> = ({ question, options = [] }) => {
  const storedOptions = localStorage.getItem('multipleChoiceAnswers');
  const [selectedOptions, setSelectedOptions] = useState<string[]>(
    storedOptions ? JSON.parse(storedOptions) : [],
  );

  useEffect(() => {
    localStorage.setItem('multipleChoiceAnswers', JSON.stringify(selectedOptions));
  }, [selectedOptions]);

  const handleOptionChange = (option: string) => {
    const updatedOptions = selectedOptions.includes(option)
      ? selectedOptions.filter((item) => item !== option)
      : [...selectedOptions, option];
    setSelectedOptions(updatedOptions);
  };

  return (
    <div>
      <h3>{question}</h3>
      <ul>
        {options.map((option, index) => (
          <li key={index}>
            <label>
              <Checkbox
                value={option}
                checked={selectedOptions.includes(option)}
                onChange={() => handleOptionChange(option)}
              >
                {option}
              </Checkbox>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MultipleChoiceQuestion;
