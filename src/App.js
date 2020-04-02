import React from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import Routes from './routes';
import history from './services/history';

import GlobalStyle from './styles/globals';

import './config/Reactotron';
import store from './store';
// import { Container } from './styles';

export default function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Routes />
        <GlobalStyle />
      </Router>
    </Provider>
  );
}
