import './App.css';

import MainHeader from './MainHeaderElement';
import NavbarTop from './NavbarTop';
import LandingPage from './InitialLandingPage';
import MainFooter from './MainFooterElement';

// import MainContent from './TenttiEtusivu';
// import MainContentWithServer from './TenttiEtusivuWithServer';
// import MainContentWithServerAndDB from './TenttiEtusivuWithServerAndDatabase';

function App() {
  return (
    <>
        <MainHeader />
        <NavbarTop />
        <main>
            <LandingPage />
        </main>
        <MainFooter />
    </>
  );
}

export default App;