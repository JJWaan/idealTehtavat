import { useState } from 'react';

import './App.css';

import MainHeader from './MainHeaderElement';
import NavbarTop from './NavbarTop';
import MainFooter from './MainFooterElement';

import LandingPage from './LandingPage';
import TenttiEtusivuWithServerAndDatabase from './TenttiEtusivuWithServerAndDatabase';

function App() {
  // const [tokenExists, setTokenExists] = useState(localStorage.getItem("jwt-tokeni"));
  const [tokenExists, setTokenExists] = useState(false);

  // const TokenSetter = (tokenExists) => {
  //   setTokenExists(tokenExists);
  // };

  const TokenSetter = () => {
    setTokenExists(true);
  };

  const TokenSetterFalse = () => {
    setTokenExists(false);
  };

  return (
      <>
        {/* <MainHeader /> */}
        <LandingPage tokensetter={TokenSetter} />
        { tokenExists ? <> <NavbarTop tokensetter={TokenSetterFalse} /> <TenttiEtusivuWithServerAndDatabase /> </> : null }
        {/* <MainFooter /> */}
      </>

  );
};

export default App;