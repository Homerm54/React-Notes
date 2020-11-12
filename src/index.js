import React from 'react';
import ReactDOM from 'react-dom';
import App from './React-Notes';
import { BrowserRouter } from "react-router-dom";

// import { FirebaseContextProvider } from './Firebase';

import CssBaseline from "@material-ui/core/CssBaseline";

import 'fontsource-roboto';

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline /> {/* Mui CSS Defaults */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);