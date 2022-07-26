import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Contacts from './Components/Contacts/Contacts';
import './App.css';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/contact' element={ <Contacts/> } /> 
        </Routes>
      </BrowserRouter>    
    </>
  );
}

export default App;
