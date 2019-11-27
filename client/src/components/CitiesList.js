import React from 'react';

const uri = 'http://localhost:5000/cities/all';


class CitiesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      isFetching: false,
      cities: []
    };
  }

  componentDidMount() {
    this.getCitiesList();
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  getCitiesList = () => {
    this.setState({
      isFetching: true
    })
    fetch(uri)
    .then(response => response.json())
    .then(result => {
      console.log("data: " + result.data)
      this.setState({
          cities: result.data,
          isFetching: false
      })})
      .catch(e => console.log(e));
  }

  render() {
    return (
      <section className="content">
        <h1>Cities</h1>
        <p>{this.state.isFetching ? 'Loading cities...' : ''}</p>
        <div id="citiesList">
        {this.state.cities.map( city =>
            <p key={city.name}><b>{city.name}</b>, {city.country}</p>
          ) }
        </div>
      </section>
    );
  }
}

export default CitiesList;



fetch("http://localhost:5000/cities/all")
.then((resp) => resp.json())
.then(function(data) {
  console.log(data);
})
.catch(function(error) {
  console.log(error);
});   

