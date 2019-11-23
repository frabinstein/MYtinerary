import React from 'react';
import CitiesCarousel from './CitiesCarousel';
import {Link} from 'react-router-dom';


class Home extends React.Component {
  render() {
    return (
      <section className="content" id="home">
        <section id="start">
          <p>Find your perfect trip, designed by insiders who know and love their cities</p>
          <Link to="./cities">
            <img src={require('../images/icons-logos/arrow.png')} alt="" id="arrow"/>
          </Link>
        </section>
        <CitiesCarousel />
      </section>
    );
  }
}

export default Home;
