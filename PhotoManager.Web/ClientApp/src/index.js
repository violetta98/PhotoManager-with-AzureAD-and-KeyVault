import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './index.css';
import './assets/fonts/iconic/css/material-design-iconic-font.min.css';
import './assets/utils/util.css';
import 'font-awesome/css/font-awesome.min.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import configureStore from './store/configureStore';
import App from './App';

import registerServiceWorker from './registerServiceWorker';
import { history } from './helpers/history';
import { config } from './config';

// Get the application-wide store instance, prepopulating with state from the server where available.
const initialState = window.initialReduxState;
const store = configureStore(history, initialState);

const rootElement = document.getElementById('root');
document.body.style.backgroundImage = `url(${`${config.backgroundImageUrl}`})`;
document.body.style.backgroundSize = 'cover';

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history} forceRefresh={true}>
      <App />
    </ConnectedRouter>
  </Provider>,
  rootElement);

registerServiceWorker();
