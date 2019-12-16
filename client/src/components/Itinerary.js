import React from 'react';
import {Link} from 'react-router-dom';

const uri = 'http://localhost:5000/cities/itinerary/:itinerary_id/activities/';

class Itinerary extends React.Component {
  constructor(props) {
    super(props);
    this.itinerary = this.props.itinerary;
    this.state = { 
      isFetching: false,
      activities: []
    };
  }

  componentDidMount() {
    this.getActivities();
  }

  getActivities = () => {
    this.setState({
      isFetching: true
    })
    fetch(uri.replace(":itinerary_id", this.itinerary._id))
      .then(response => response.json())
      .then(data => {
        this.setState({
            activities: data[0].activities,
            isFetching: false
        })})
      .catch(e => console.log(e));
  }

  render() {
    return (
      <section className="itineraryDetail">
        <p>{this.state.isFetching ? 'Loading itineraries...' : ''}</p>
        <div id="itinerariesList">
        <p><b>{this.itinerary.title}</b></p>
        <p>Likes: {this.itinerary.rating}</p>
        <p>{this.itinerary.duration} Hours</p>
        <p>$$ {this.itinerary.cost != 0 ? this.itinerary.cost : ""}</p>
        <p>{this.itinerary.tags.join(" ")}</p>
        <p>View all</p>
        <h3>activities</h3>
        <p>{this.state.activities.map(activity => activity.name).join(" ")}</p>
        </div>
      </section>
    );
  }
}

export default Itinerary;
