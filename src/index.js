import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import STORE from './store';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <App store={STORE} />
  </React.StrictMode>,
  document.getElementById('root')
);