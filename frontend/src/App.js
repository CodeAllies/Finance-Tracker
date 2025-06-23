import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import YearView from './components/YearView';
import Home from './components/Home';
import MonthView from './components/MonthView';
import CategoryView from './components/CategoryView';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/year/:year" element={<YearView />} />
          <Route path="/year/:year/:month" element={<MonthView />} /> 
          <Route path="/year/:year/:month/:category" element={<CategoryView />} />
      </Routes>
    </Router>
  );
}

export default App;
