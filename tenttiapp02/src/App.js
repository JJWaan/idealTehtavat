import './App.css';

import Header from './HeaderElement';
import Navbar from './Navbar';
import Footer from './FooterElement';

import MainContent from './TenttiEtusivu';

function App() {
  return (
    <>
      <div className='main-flex-container'>
        <Header />
        <Navbar />
        <MainContent />
        <Footer />
      </div>
    </>
  );
}

export default App;