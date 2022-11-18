import './App.css';

import MainHeader from './MainHeaderElement';
import NavbarTop from './NavbarTop';
import MainFooter from './MainFooterElement';

// import MainContent from './TenttiEtusivu';
// import MainContentWithServer from './TenttiEtusivuWithServer';
import MainContentWithServerAndDB from './TenttiEtusivuWithServerAndDatabase';

function App() {
  return (
    <>
      <div className='main-flex-container'>
        <MainHeader />
        <NavbarTop />
        <MainContentWithServerAndDB />
        <MainFooter />
      </div>
    </>
  );
}

export default App;