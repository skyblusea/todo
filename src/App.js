import './App.css';
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Today from './Pages/today';
import Month from './Pages/month';


function App() {


  return (
    <BrowserRouter basename='/todo'>
      <div className="App">
        <Routes>
          <Route path="/" element={<Month />}/>
          <Route path="/today" element={<Today />}/>
        </Routes>    
      </div>
    </BrowserRouter>
  );
}

export default App;
