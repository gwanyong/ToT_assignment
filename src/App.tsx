import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { AuthForm } from './pages/index';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthForm />} />
        <Route path="/auth" element={<AuthForm />} />
        <Route path="/auth/:step" element={<AuthForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
