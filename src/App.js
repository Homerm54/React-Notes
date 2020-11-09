import Navbar from './pages/Navbar';
import Dashboard from './pages/Dashboard';
import Note from './pages/NotePage';
import Landing from './pages/Landpage';
import Register from './pages/Register';
import Account from './pages/Account';
import FixAccount from './pages/AccountFix';
import NotFound404 from './pages/NotFound404';

import { Switch, Route } from 'react-router-dom';
import * as ROUTES from './constants/routes';

function App() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path={ ROUTES.LANDING } component={ Landing } />
        <Route exact path={ ROUTES.DASHBOARD } component={ Dashboard } />
        <Route path={ ROUTES.NOTE } component={ Note } />
        <Route path={ ROUTES.REGISTER } component={ Register } />
        <Route path={ ROUTES.ACCOUNT } component={ Account } />
        <Route path={ ROUTES.FIX_ACCOUNT } component={ FixAccount } />
        <Route path='/' component={ NotFound404 } />
      </Switch>
    </>
  );
}

export default App;
