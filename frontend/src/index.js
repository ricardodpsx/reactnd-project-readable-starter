import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import thunk from 'redux-thunk'

import reducer from './reducer'
import {Provider} from 'react-redux';
import {applyMiddleware, compose, createStore} from 'redux';
import {requireAuthorMiddleware} from "./components/author/middleware";
import {goTo} from "./components/router";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose


function requireAuthorPolicy(action, state) {

  if (action.type === goTo.name && action.href.startsWith("/post")) {
    let operation = action.href.split("/").pop();
    if (["edit", "delete", "new"].indexOf(operation) !== -1)
      return "Edit, Create And Delete posts";
  }

  if (action.name === "doSavePost")
    return "Edit or Create Posts";


  if (action.name === "doRemovePost")
    return "Remove Posts";


  if (action.name === "doSendComment")
    return "Add Comments";

  if (action.name === "doRemoveComment")
    return "Delete comments";
}

const store = createStore(
  (st = {}, action) => reducer(st, action),
  composeEnhancers(
    applyMiddleware(
      requireAuthorMiddleware(requireAuthorPolicy),
      thunk
    ),
  )
);

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root'));

registerServiceWorker();
