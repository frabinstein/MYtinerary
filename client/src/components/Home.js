import React from 'react';
import User from './User';
import {Link} from 'react-router-dom';


class Home extends React.Component {
  render() {
    return (
      <section className="content" id="home">
        <p>Find your perfect trip, designed by insiders who know and love their cities</p>
        <section id="start">
          <h2>Start browsing</h2>
          <Link to="./cities">
            <img src={require('../images/icons-logos/arrow.png')} alt="" id="arrow"/>
          </Link>
        </section>
        <User />
      </section>
    );
  }
}

export default Home;
