import { useState } from 'react';

import './App.css';

import LandingPage from './LandingPage';
import TenttiEtusivuWithServerAndDatabase from './TenttiEtusivuWithServerAndDatabase';

function App() {
  const [tokenExists, setTokenExists] = useState(localStorage.getItem("jwt-tokeni"));

  const TokenSetter = () => {
    setTokenExists(true);
  };

  const TokenSetterFalse = () => {
    setTokenExists(false);
  };

  return (
      <>
        <LandingPage tokensetter={TokenSetter} />
        { tokenExists ?
          <main>
            <TenttiEtusivuWithServerAndDatabase tokensetter={TokenSetterFalse} />
          </main>
        : null }
      </>

  );
};

export default App;