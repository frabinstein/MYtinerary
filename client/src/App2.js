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
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/cities" component={CitiesList} />
          <Route path="/city" component={City} />
          <Link to="./">
              <img src={require('./images/icons-logos/homeIcon.png')} alt="" id="homeButton"/>
          </Link>
        </article>
      </Router>
    );
  }
}

export default App;
