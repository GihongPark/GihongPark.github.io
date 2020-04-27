import React from 'react';
import './Reset.scss';
import './App.scss';

import Home from './components/Home';
import Profile from './components/Profile';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';

function App() {
  return (
    <div className="App">
      <div className='position'></div>
      <div className='menu'></div>
      <section className='contents'>
        <Home />
        <Profile />
        <Portfolio />
        <Contact />
      </section>
    </div>
  );
}

export default App;
