import React from 'react';
import './App.css'; 
import { DefaultNavbar } from './components';

const App = () => {
  return (
    <div>
        <DefaultNavbar></DefaultNavbar>
      <div className="GradientBackground"> 
        <p>Join the community at Word Enlighten, where language ignites minds. With our smart tools, turn every word into a stepping stone towards global fluency. Sign up for free, and let's conquer language barriers together!</p>
      </div>
    </div>
  );
}

export default App;
