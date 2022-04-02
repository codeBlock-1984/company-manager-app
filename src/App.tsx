import React from 'react';
import Modal from 'react-modal';
import './App.css';
import CompanyList from './company/CompanyList';

Modal.setAppElement('#root');

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Company Manager App</h1>
      </header>
      <CompanyList></CompanyList>
    </div>
  );
}

export default App;
