import {
  createStore,
  combineReducers,
  applyMiddleware,
  compose
} from 'redux';
import thunk from 'redux-thunk';
import { authReducer, uiReducer, noteReducer } from 'redux/reducers/';

const singleReducer = combineReducers({
  auth: authReducer,
  ui: uiReducer,
  notes: noteReducer,
})

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

/*const ReduxDevTool = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();*/

export const store = createStore(
  singleReducer, composeEnhancers(
    applyMiddleware(thunk)
  )
);