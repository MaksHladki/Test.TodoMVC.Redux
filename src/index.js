import 'normalize.css/normalize.css';
import 'todomvc-app-css/index.css';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore, compose } from 'redux';
import persistState from 'redux-localstorage';
import logger from 'redux-logger'

import App from './containers/App';
import TodoReducers from './reducers';
import Todo from './models/Todo';

const enhancer = compose(
    persistState('todos', {
        serialize: function (state) {
            return JSON.stringify(state);
        },
        deserialize: function (paths) {
            var state = JSON.parse(paths) || {};
            state.todos = state.todos || [];
            state.todos = state.todos.map(element => new Todo({ ...element }));
            return state;
        }
    }),
);

const middlewares = [];

if (DEBUG) {
    middlewares.push(logger)
}

const store = createStore(
    TodoReducers,
    applyMiddleware(...middlewares),
    enhancer
);

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('container')
);