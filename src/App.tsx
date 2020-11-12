import React, { useState } from 'react';
import { forEachChild } from 'typescript';
import './App.css';

const MemoryApp = () => {
  const [state, setState] = useState(1);

  setTimeout(() => setState(0), 5000);

  return (
    <div className="main-app">
      {state ? (
        <h3>Iegaumē šo - gsdgsdgsdjvsdjvlksdgjdfbklsfdbo9853 </h3>
      ) : (
        <div>
          <h3>Ieraksti ko tu atceries un nekas nenotiks! </h3>
          <input type="text" placeholder="Raksti te" className='input' />
        </div>
      )}
    </div>
  );
};

export default MemoryApp;
