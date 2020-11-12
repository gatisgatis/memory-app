import React, { useState } from 'react';
import { forEachChild } from 'typescript';
import './App.css';

const MemoryApp = () => {
  const [state, setState] = useState(1);

  setTimeout(() => setState(0), 5000);

  return (
    <div className="main-app">
      {' '}
      {state
        ? 'Iegaumē šo - gsdgsdgsdjvsdjvlksdgjdfbklsfdbo9853'
        : 'Ko tu atcerējies?'}{' '}
    </div>
  );
};

export default MemoryApp;
