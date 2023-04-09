import './App.css';
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Today from './Pages/today';
import Month from './Pages/month';


function App() {
  const [selectedDate, setDate] = useState(new Date().toISOString().substring(0,10));
  const today= new Date(selectedDate);

  return (
    <BrowserRouter basename='/todo'>
      <div className="App">
        <Routes>
          <Route path="/" element={<Month today={today} />}/>
          <Route path="/today" element={<Today today={today} selectedDate={selectedDate} setDate={setDate} />}/>
        </Routes>    
      </div>
    </BrowserRouter>
  );
}

export default App;
