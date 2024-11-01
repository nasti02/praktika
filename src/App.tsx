import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Countries from './pages/Countries';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Countries" element={<Countries  />} />
            </Routes>
        </Router>
    );
};

export default App;