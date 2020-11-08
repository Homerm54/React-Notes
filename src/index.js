import React from 'react';
import ReactDOM from 'react-dom';
import Main_Page from './Main_Page';
import reportWebVitals from './reportWebVitals';

import CssBaseline from "@material-ui/core/CssBaseline";

import 'fontsource-roboto';

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />
    <Main_Page />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
