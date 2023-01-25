import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { SWRConfig } from 'swr';
import { AuthForm } from './pages/index';

function App() {
  return (
    <RecoilRoot>
      <SWRConfig>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AuthForm />} />
            <Route path="/auth/:step" element={<AuthForm />} />
          </Routes>
        </BrowserRouter>
      </SWRConfig>
    </RecoilRoot>
  );
}

export default App;
