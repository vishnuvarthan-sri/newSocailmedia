

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import SignIn from './Components/SignIn.jsx';
import SignUp from './Components/SignUp.jsx';
import Page from './Components/page.jsx'
import { Provider } from 'react-redux';
import reducers from './reducers/index';
import thunk from 'redux-thunk';
import { createStore,applyMiddleware } from 'redux';
import {HashRouter,Route} from 'react-router-dom';


const App = () => (
  <div>
    <Route path="/" exact component={SignIn} />
    <Route path="/signup" exact component={SignUp} />
    <Route path ="/page" exact component={Page}/>
  </div>
)

const store = createStore(reducers,applyMiddleware(thunk))

ReactDOM.render(
  <Provider store={store}>
  <HashRouter>
  <App />
  </HashRouter>
  </Provider>,
  document.getElementById('root')
);

