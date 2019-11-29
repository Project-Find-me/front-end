import React from 'react';
import { CssBaseline, MuiThemeProvider } from '@material-ui/core';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { css } from 'glamor';

import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';

import './styles/global.css';

import Routes from './routes';
import history from './services/history';
import theme from './styles/theme';

import './config/reactotronConfig';

import { store, persistor } from './store';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router history={history}>
          <MuiThemeProvider theme={theme}>
            <Routes />
            <ToastContainer
              className={css({
                fontSize: 16,
                fontWeight: 'bold',
              })}
              autoClose={4000}
              position="bottom-left"
            />
          </MuiThemeProvider>
          <CssBaseline />
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
