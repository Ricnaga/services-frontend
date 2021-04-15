import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';
import { mirageServer } from './services/mirage';
import GlobalStyle from './styles/global';

mirageServer();

const App: React.FC = () => (
  <>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>

    <GlobalStyle />
  </>
);
export default App;
