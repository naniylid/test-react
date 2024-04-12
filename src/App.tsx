import { useState } from 'react';
import TestComponent from './Test';
import './styles/App.scss';

function App() {
  return (
    <>
      <TestComponent timeLimitInMinutes={15} />
    </>
  );
}

export default App;
