import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import themes from './styles/themes';
import App from './App';
import GlobalStyle from './styles/GlobalStyles';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <GlobalStyle />
    <ThemeProvider theme={themes}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);
