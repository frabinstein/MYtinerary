import React from 'react';
import Filter from './Filter';

const uri = 'http://localhost:5000/cities/all';

class CitiesList extends React.Component {
  constructor(props) {
    super(props);
    this.filterCities = this.filterCities.bind(this);
    this.state = { 
      isFetching: false,
      cities: [],
      filteredCities: []
    };
  }

  componentDidMount() {
    this.getCitiesList();
  }

  getCitiesList = () => {
    this.setState({
      isFetching: true
    })
    fetch(uri)
      .then(response => response.json())
      .then(data => {
        this.setState({
            cities: data,
            isFetching: false,
            filteredCities: data
        })})
      .catch(e => console.log(e));
  }

  filterCities(filterValue) {
    let filteredCities = this.state.cities
    filteredCities = filteredCities.filter((city) =>
      city.name.toLowerCase().indexOf(filterValue.toLowerCase()) == 0
    )
    this.setState({
      filteredCities
    })
  }

  render() {
    return (
      <section className="content">
        <h1>Cities</h1>
        <p>{this.state.isFetching ? 'Loading cities...' : ''}</p>
        <Filter onFilterChange={this.filterCities} />
        <div id="citiesList">
        {this.state.filteredCities.map( city =>
            <p key={city.name}><b>{city.name}</b>, {city.country}</p>
          ) }
        </div>
      </section>
    );
  }
}

export default CitiesList;
