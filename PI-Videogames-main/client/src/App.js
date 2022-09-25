import './App.css';
//import { Link, Route, useNavigate } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import React from 'react';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import Form from './components/Form'
import Details from './components/Details'

function App() {
  return (
    <div className='App'>
      <Switch>
        <Route exact path = {'/'} component ={LandingPage}/>
        <Route path = {'/home'} component ={Home}/>
        <Route path = {'/create'} component ={Form}/>
        <Route path={'/home/:id'} component = {Details}/>
      </Switch>
    </div>
  );
}

export default App;
