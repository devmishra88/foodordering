import React from 'react';
import {ProvideAuth} from './context/Auth';
import {
  BrowserRouter as Router
} from "react-router-dom";

import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <ProvideAuth>
    <Router>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Router>
  </ProvideAuth>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
