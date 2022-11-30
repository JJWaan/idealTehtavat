import { useState } from 'react';

import './App.css';

import LandingPage from './LandingPage';

import NavbarTop from './NavbarTop';
import TenttiEtusivuWithServerAndDatabase from './TenttiEtusivuWithServerAndDatabase';
import MainFooter from './MainFooterElement';

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
          <>
            <NavbarTop tokensetter={TokenSetterFalse} />
            <TenttiEtusivuWithServerAndDatabase />
            <MainFooter />
          </>
        : null }
      </>

  );
};

export default App;