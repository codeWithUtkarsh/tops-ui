import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';
import Header from './components/structure/Header';
import Footer from './components/structure/Footer';
import Success from './components/content/Success';
import Failed from './components/content/Failed';
import Details from './components/content/Details';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <Router>
    <Header/>
      <Switch>
            <Route exact path="/" render={() => <Redirect to="/story/Transform-to-Open-Science/edit/home"/>} />
            <Route exact path="/story/Transform-to-Open-Science/edit/home" component={Details} />
            <Route exact path="/story/Transform-to-Open-Science/edit/success" render={() => showSuccess() ? <Success/> : <Redirect to="/"/> } />
            <Route exact path="/story/Transform-to-Open-Science/edit/failed" render={() => showFailed() ? <Failed/> : <Redirect to="/"/> } />
      </Switch>
    <Footer />
  </Router>,
  document.getElementById('root')
);

function showFailed() {
  console.log(typeof global.failed)
  if(typeof global.failed === 'undefined'){
    return false;
  }
  return global.failed
}

function showSuccess() {
  console.log(typeof global.success)
  if(typeof global.success === 'undefined'){
    return false;
  }
  return global.success
}