import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './Pages/Login';
import Profile from './Pages/Profile';
import Chat from './Pages/Chat';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Login />} />
        <Route exact path='/profile' element={<Profile />} />
        <Route exact path='/chat' element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;