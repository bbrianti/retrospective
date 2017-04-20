import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';

let nextTodoId = 1;
//const App = connect(null, null)(App);
class Column extends Component {
  componentDidMount() {
    const { store } = this.context;
    this.unsubscribe = store.subscribe(() =>
      this.forceUpdate()
    );
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const props = this.props;
    const { store } = this.context;
    const state = store.getState();
    return (
      <div>
        <input ref={node => {
          this.input = node;
        }} />
        <button onClick={() => {
          store.dispatch({
            type: 'ADD_ITEM',
            text: this.input.value,
            column: props.col,
            id: nextTodoId++
          });
          this.input.value = '';
        }}>
          Add
        </button>
        <ul>
          {state.columns[props.col].map(todo =>
            <li key={todo.id}>
              {todo.text}
            </li>
          )}
        </ul>
      </div>
    )
  }
}
Column.contextTypes = {
  store : React.PropTypes.object
};


class App extends Component {
  render() {
    return (
      <div>
        <div className='column'>
          Start
          <Column col={0}/>
        </div>
        <div className='column'>
          Stop
          <Column col={1}/>
        </div>
        <div className='column'>
          Continue
          <Column col={2}/>
        </div>
      </div>
    );
  }
}

export default App;
