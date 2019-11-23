import React from 'react';
import {Link} from 'react-router-dom';


class User extends React.Component {
  render() {
    return (
      <section id="user">
        <p>Want to build your own MYtinerary?</p>
        <div><Link to="./login">Log in</Link><Link to="./signup">Create Account</Link></div>
      </section>
    );
  }
}

export default User;
