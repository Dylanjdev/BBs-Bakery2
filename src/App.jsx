
import './App.css';

// Component imports (to be created)
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Menu from './components/Menu';
// import PreOrder from './components/PreOrder';
// import Croissants from './components/Croissants';
// import Hours from './components/Hours';
import Contact from './components/Contact';
import Footer from './components/Footer';
// import Modal from './components/Modal';
// import ImageModal from './components/ImageModal';

function App() {
  return (
    <div className="App">
      <Header />
      <Hero />
      <About />
      <Menu />
      {/* <PreOrder /> */}
      {/* <Croissants /> */}
      {/* <Hours /> */}
      <Contact />
      <Footer />
      {/* <Modal /> */}
      {/* <ImageModal /> */}
      {/* Components will be implemented and imported above */}
    </div>
  );
}

export default App;
