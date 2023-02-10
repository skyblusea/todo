import './App.css';
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Today from './Pages/today';
import Month from './Pages/month';


function App() {
  const [closeToday, setcloseToday] = useState(false)
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Month closeToday={closeToday} setcloseToday={setcloseToday} />}/>
          <Route path="/today" element={<Today closeToday={closeToday} setcloseToday={setcloseToday} />}/>
        </Routes>    
      </div>
    </BrowserRouter>
  );
}

export default App;
