import React from 'react';
import './App.css'; 
import { Home,  } from './pages';
import { BrowserRouter,  Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <div>
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>

        </BrowserRouter>

    </div>
  );
}

export default App;
