import React from 'react';
import './App.css'; 
import { Home, Register, LogIn, Dashboard } from './pages';
import { BrowserRouter,  Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <div>
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/dashboard" element={<Dashboard />} />


        </Routes>

        </BrowserRouter>

    </div>
  );
}

export default App;
