import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import { AuthForm } from './pages/index';

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthForm />} />
          <Route path="/auth/:step" element={<AuthForm />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
