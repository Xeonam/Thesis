import React from 'react';
import './App.css'; 
import { DefaultNavbar, Hero, HeroImage, FeaturesSection } from './components';

const App = () => {
  return (
    <div>
        <DefaultNavbar />
        <Hero />
        <HeroImage />
        <FeaturesSection />
    </div>
  );
}

export default App;
