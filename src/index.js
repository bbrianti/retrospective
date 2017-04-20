import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

const initialState = {
  columns: [
    [],
    [],
    []
  ]
}

const reducer = (state = [], action) => {
  console.log(state);
  switch (action.type) {
    case 'ADD_ITEM':
      var newState = Object.assign({}, state);
      newState.columns[action.column].push({
        text: action.text,
        id: action.id
      });
      console.log(newState);
      return state;
    default:
      return state;
  }
}

ReactDOM.render(
  <Provider store={createStore(reducer, initialState)}>
  <App />
  </Provider>,
  document.getElementById('root')
);
