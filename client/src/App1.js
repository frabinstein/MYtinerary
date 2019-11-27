import React from 'react';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import CitiesList from './components/CitiesList';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';


class App extends React.Component {
  render() {
    return (
      <Router>
        <article id="main">
          <img src={require('./images/icons-logos/MYtineraryLogo.png')} alt="" id="logo"/>
          <Route exact path="/" component={Home} />
          <Route path="/cities" component={CitiesList} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Link to="./">
              <img src={require('./images/icons-logos/homeIcon.png')} alt="" id="homeButton"/>
          </Link>
        </article>
      </Router>
    );
  }
}

export default App;
