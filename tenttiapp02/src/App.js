import { useState } from 'react';

import './App.css';

import MainHeader from './MainHeaderElement';
import NavbarTop from './NavbarTop';
import MainFooter from './MainFooterElement';

import LoginSignup from './LoginComponent';
import TenttiEtusivuWithServerAndDatabase from './TenttiEtusivuWithServerAndDatabase';

function App() {
  const [onxTokee, setOnxTokee] = useState(localStorage.getItem("jwt-tokeni"));

  return (
    
      onxTokee ?
      <>
        <MainHeader />
        <NavbarTop />
        <TenttiEtusivuWithServerAndDatabase />
      </>
      :
      <>
        <MainHeader />
        <NavbarTop />
        <LoginSignup />
        <MainFooter />
      </>

  );
};

export default App;