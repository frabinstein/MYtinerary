import { GET_ALL_CITIES, GET_CITY, POST_CITY } from './actionTypes';

export function getCitiesList() {
  const uri = 'http://localhost:5000/cities/all';

  return dispatch => {
    dispatch(requestPosts(subreddit))
    return fetch(`https://www.reddit.com/r/${subreddit}.json`)
      .then(response => response.json())
      .then(json => dispatch(receivePosts(subreddit, json)))
  }
}

export function getCitiesList(subreddit, json) {
  return {
    type: RECEIVE_POSTS,
    subreddit,
    posts: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  }
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

