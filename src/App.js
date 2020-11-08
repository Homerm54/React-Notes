import Navbar from './components/navbar';
import Dashboard from './components/dashboard';
import Note from './components/note_detail';
import { Switch, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route path='/note/:name'>
          <Note />
        </Route>
        <Route exact path='/'>
          <Dashboard />
        </Route>
        <Route path='/'>
          <h1 style={{margin: '4rem'}}>404 Not Found</h1>
        </Route>
      </Switch>
    </>
  );
}

export default App;
