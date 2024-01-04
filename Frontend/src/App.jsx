import React from 'react';
import './App.css'; 
import { DefaultNavbar, Hero, HeroImage } from './components';

const App = () => {
  return (
    <div>
        <DefaultNavbar />
        <Hero />
        <HeroImage />
    </div>
  );
}

export default App;
