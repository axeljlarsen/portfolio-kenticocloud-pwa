import React, { Component } from 'react';
import { Router, browserHistory, Route, Link } from 'react-router';
import Header from './Components/Header.js';
import logo from './logo.svg';
import './App.css';

const Page = ({ title }) => (
    <div className="App">
      <Header />
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>{title}</h2>
      </div>
      <p className="App-intro">
        This is the {title} page.
      </p>
      <p>
        <Link to="/">Home</Link>
      </p>
      <p>
        <Link to="/about">About</Link>
      </p>
      <p>
        <Link to="/settings">Settings</Link>
      </p>
    </div>
);

const Home = (props) => (
  <Page title="Home"/>
);

const About = (props) => (
  <Page title="About"/>
);

const Settings = (props) => (
  <Page title="Settings"/>
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