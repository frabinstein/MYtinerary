import React from 'react';
import {Link} from 'react-router-dom';
import Itinerary from './Itinerary';

const axios = require('axios');
const uri = 'http://localhost:5000/itineraries/city/';

class City extends React.Component {
  constructor(props) {
    super(props);
    this.city_id = this.props.location.city_id;
    this.cityName = this.props.location.cityName;
    this.state = { 
      isFetching: false,
      itineraries: []
    };
  }

  componentDidMount() {
    this.getItineraries();
  }

  getItineraries = () => {
    this.setState({
      isFetching: true
    })
    axios.get(uri + this.city_id)
      .then(response => {
        this.setState({
            itineraries: response.data,
            isFetching: false
        })})
      .catch(e => console.log(e));
  }

  render() {
    return (
      <section className="cityDetail">
        <h1>{this.cityName}</h1>
        <h2>Available MYtineraries:</h2>
        <p>{this.state.isFetching ? 'Loading itineraries...' : ''}</p>
        <div id="itinerariesList">
          {this.state.itineraries.map( itinerary =>
            <Itinerary key={itinerary._id} itinerary={itinerary} />
          ) }
        </div>
        <Link to="./cities">Choose another city</Link>
      </section>
    );
  }
}

export default City;
