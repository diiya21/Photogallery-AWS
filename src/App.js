import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import Auth from './components/auth/Auth';
import Home from './components/home/Home';

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Routes> {/* Replace Switch with Routes */}
        <Route path="/login" element={<Auth setUser={setUser} />} /> {/* Use element instead of children */}
        <Route path="/" element={user ? <Home /> : <Auth setUser={setUser} />} /> {/* Use element instead of children */}
      </Routes>
    </Router>
  );
};

export default App;
