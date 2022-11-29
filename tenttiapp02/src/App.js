import { useState } from 'react';

import './App.css';

import MainHeader from './MainHeaderElement';
import NavbarTop from './NavbarTop';
import MainFooter from './MainFooterElement';

import LandingPage from './LandingPage';
import TenttiEtusivuWithServerAndDatabase from './TenttiEtusivuWithServerAndDatabase';

function App() {
  const [tokenExists, setTokenExists] = useState(localStorage.getItem("jwt-tokeni"));

  const TokenSetter = (tokenExists) => {
    setTokenExists(tokenExists);
  };

  return (
      <>
        {/* <MainHeader /> */}
        <LandingPage />
        { tokenExists ? <> <NavbarTop tokensetter={TokenSetter} /> <TenttiEtusivuWithServerAndDatabase /> </> : null }
        <MainFooter />
      </>

  );
};

export default App;