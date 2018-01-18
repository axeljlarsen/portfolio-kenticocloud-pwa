import React, { Component } from 'react';
import { Router, browserHistory, Route, Link } from 'react-router';
import Header from './Components/Header.js';
import logo from './logo.svg';
import './Styles/App.css'; 

const Page = ({ title }) => (
    <div className="App">
      <Header />
    </div>
);

const App = (props) => {
  return (
    <div>
      <Header />
      {props.children}
    </div>
  );
}

export default App;