import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import Portfolio from './pages/Portfolio';
import Contact from './pages/Contact';

function App() {
  return (
    <ThemeProvider>
      <Header />
      <main>
        <Home />
        <Services />
        <About />
        <Portfolio />
        <Contact />
      </main>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
