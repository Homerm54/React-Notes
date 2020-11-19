import React from 'react';

import { Provider } from "react-redux";
import { store } from 'redux/store';
import { AppRouter } from 'router';

// UI
import { BrowserRouter } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";

function App() {

  return (
    <Provider store={store}>
      <CssBaseline /> {/* Mui CSS Defaults */}
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
