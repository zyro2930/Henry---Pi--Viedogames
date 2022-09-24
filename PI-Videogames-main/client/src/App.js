import './App.css';
//import { Link, Route, useNavigate } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import React from 'react';
import LandingPage from './components/LandingPage';
import Home from './components/Home';

function App() {
  return (
    <div className='App'>
      <Switch>
        <Route exact path = {'/'} component ={LandingPage}/>
        <Route path = {'/home'} component ={Home}/>
      </Switch>
    </div>
  );
}

export default App;
