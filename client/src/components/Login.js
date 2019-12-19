import React from 'react';
import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

const axios = require('axios');
const uri = 'http://localhost:5000/users/login';
const defaultUserIcon = require('../images/icons-logos/default-user-icon.png')

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      rememberMe: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    axios.post(uri, this.state)
      .then(response => {
        if(response.data.error)
          alert("Error: " + response.data.error);
        else
          alert('Welcome back, ' + response.data.firstName + ' ' + response.data.lastName);
        })
      .catch(e => console.log(e));
  }

  render() {
    return (
      <section className="content" id="login">
        <h1>Log In</h1>
        <Form onSubmit={this.handleSubmit} noValidate>
          <FormGroup row>
            <Label for="username" sm={2}>Username</Label>
            <Col sm={10}>
              <Input type="text" name="username" value={this.state.username} onChange={this.handleChange} id="username" placeholder={this.state.email} />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="password" sm={2}>Password</Label>
            <Col sm={10}>
              <Input type="password" name="password" value={this.state.password} onChange={this.handleChange} id="password" />
            </Col>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input type="checkbox" name="rememberMe" checked={this.state.rememberMe} onChange={this.handleChange} id="rememberMe" />{' '}
              Remember me
            </Label>
          </FormGroup>
          <Button>OK</Button>
        </Form>
        <p>Don't have a MYtinerary account yet?<br />You should create one! It's totally free and only takes a minute.</p>
        <a href="/signup">Create account</a>
      </section>
    );
  }
}

export default Login;
