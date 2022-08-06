import React from 'react';

import ReactDOM from 'react-dom/client';

import { Provider } from 'react-redux';
import { store } from './store';

import { createBrowserHistory } from 'history';

import './index.css';
import App from './App';
import CustomRouter from './components/CustomRouter';

const history = createBrowserHistory()


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // basename={process.env.PUBLIC_URL}
  // tslint:disable-next-line
  
  <CustomRouter 
    children={
      <Provider  store={store}>
        <App/>  
      </Provider>
    }
    basename={``}
    history={history}
  />
  , 
);
