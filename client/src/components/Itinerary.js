import React from 'react';

const axios = require('axios');
const uri = 'http://localhost:5000/itineraries/:itinerary_id/activities/';

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
  }

  getActivities = () => {
    this.setState({
      isFetching: true
    })
    axios.get(uri.replace(":itinerary_id", this.itinerary._id))
      .then(response => {
        this.setState({
            activities: response.data[0].activities,
            isFetching: false
        });
        document.querySelector("#id"+this.itinerary._id+" .activities").style.display = "initial";
      })
      .catch(e => console.log(e));
  }

  render() {
    return (
      <section className="itineraryDetail" id={"id"+this.itinerary._id}>
        <p><b>{this.itinerary.title}</b></p>
        <p>ID: {this.itinerary._id}</p>
        <p>Likes: {this.itinerary.rating}</p>
        <p>{this.itinerary.duration} Hours</p>
        <p>$$ {this.itinerary.cost !== 0 ? this.itinerary.cost : ""}</p>
        <p>{this.itinerary.tags.join(" ")}</p>
        <p onClick={this.getActivities}>View all</p>
        <p>{this.state.isFetching ? 'Loading activities...' : ''}</p>
        <div style={{display: "none"}} className="activities">
          <h3>activities</h3>
          <p>{this.state.activities.map(activity => activity.name).join(" ")}</p>
        </div>
      </section>
    );
  }
}

export default Itinerary;
