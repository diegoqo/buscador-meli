import React from 'react';
import logo from './logo.svg';
import './App.scss';
import axios from 'axios';

function App() {

  const onClick = () => {
        axios.get('http://localhost:8080/search-description').then(response => {
          console.log(response)
        })
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button type="submit" onClick={onClick}>Connected?</button>
      </header>
    </div>
  );
}

export default App;
