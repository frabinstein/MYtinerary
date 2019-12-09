import React from 'react';
import {Link} from 'react-router-dom';

const uri = 'http://localhost:5000/cities/';

class City extends React.Component {
  constructor(props) {
    super(props);
    this.cityName = this.props.name;
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
    fetch(uri + this.cityName)
      .then(response => response.json())
      .then(data => {
        this.setState({
            itineraries: data,
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
            <p key={itinerary.title}><b>{itinerary.title}</b></p>
          ) }
        </div>
        <Link to="./city">Choose another city</Link>
      </section>
    );
  }
}

export default City;
