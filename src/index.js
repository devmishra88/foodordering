import React from 'react';

import {ProvideAuth} from './context/Auth';
import {ProductProvider} from './context/Product';

import {
  BrowserRouter as Router
} from "react-router-dom";

import ReactDOM from 'react-dom';
import './index.css';
import 'font-awesome/css/font-awesome.min.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <ProvideAuth>
    <ProductProvider>
      <Router>
          <App />
      </Router>
    </ProductProvider>
  </ProvideAuth>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
