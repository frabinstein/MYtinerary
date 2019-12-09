import React from 'react';
import Header from './components/Header';
import Home from './components/Home2';
import Login from './components/Login';
import Signup from './components/Signup';
import CitiesList from './components/CitiesList';
import City from './components/City';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';


class App extends React.Component {
  render() {
    return (
      <Router>
        <article id="main">
          <Header />
          <img src={require('./images/icons-logos/MYtineraryLogo.png')} alt="" id="logo"/>
          <Route exact path="/" component={Home} />
          <Route path="/cities" component={CitiesList} />
          <Route path="/city" component={City} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
        </article>
      </Router>
    );
  }
}

export default App;
