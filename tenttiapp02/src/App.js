import './App.css';

import Header from './HeaderElement';
import Navbar from './Navbar';
import Footer from './FooterElement';

// import MainContent from './TenttiEtusivu';
import MainContentWithServer from './TenttiEtusivuWithServer';
// import MainContentWithServerAndDB from './TenttiEtusivuWithServerAndDatabase';

function App() {
  return (
    <>
      <div className='main-flex-container'>
        <Header />
        <Navbar />
        <MainContentWithServer />
        <Footer />
      </div>
    </>
  );
}

export default App;