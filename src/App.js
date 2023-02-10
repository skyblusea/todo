import './App.css';
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Today from './Pages/today';
import Month from './Pages/month';


function App() {
  const [backFromToday, setBackFromToday] = useState(false)
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Month backFromToday={backFromToday} />}/>
          <Route path="/today" element={<Today setBackFromToday={setBackFromToday} backFromToday={backFromToday} />}/>
        </Routes>    
      </div>
    </BrowserRouter>
  );
}

export default App;
