import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { SystemRoutes } from './config/routes';
import SessionContextProvider from './contexts/session-context';

const App: React.FC = () => {
  const baseURL = process.env.PUBLIC_URL;
  return (
    <SessionContextProvider>
      <BrowserRouter basename={baseURL} >
        <SystemRoutes />
      </BrowserRouter>
    </SessionContextProvider>
  );
}

export default App;
