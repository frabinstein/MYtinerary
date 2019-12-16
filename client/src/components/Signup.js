import React from 'react';
import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';


class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      username: '',
      password: '',
      country: 'Choose...',
      tAndC: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
//    this.setState({value: event.target.value});
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    alert('A new user was submitted\nFirst name: ' + this.state.firstName 
      + '\nLast name: ' + this.state.lastName
      + '\nEmail: ' + this.state.email
      + '\nUsername: ' + this.state.username
      + '\nPassword: ' + this.state.password
      + '\nCountry: ' + this.state.country
      + '\nAccepted Terms & Conditions: ' + this.state.tAndC);
    event.preventDefault();
  }

  render() {
    return (
      <section className="content" id="signup">
        <h1>Create account</h1>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Input type="file" name="file" id="exampleFile" />
          </FormGroup>
          <FormGroup row>
            <Label for="firstName" sm={2}>First name</Label>
            <Col sm={10}>
              <Input type="text" name="firstName" value={this.state.firstName} onChange={this.handleChange} id="firstName" />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="lastName" sm={2}>Last name</Label>
            <Col sm={10}>
              <Input type="text" name="lastName" value={this.state.lastName} onChange={this.handleChange} id="lastName" />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="email" sm={2}>Email</Label>
            <Col sm={10}>
              <Input type="email" name="email" value={this.state.email} onChange={this.handleChange} id="email" />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="username" sm={2}>Username</Label>
            <Col sm={10}>
              <Input type="text" name="username" value={this.state.username} onChange={this.handleChange} id="username" placeholder={this.state.email} />
              <FormText color="muted">
              You may create a username, or leave it blank to just use your email
            </FormText>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="password" sm={2}>Password</Label>
            <Col sm={10}>
              <Input type="password" name="password" value={this.state.password} onChange={this.handleChange} id="password" />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="country" sm={2}>Country</Label>
            <Col sm={10}>
              <Input type="select" name="country" value={this.state.country} onChange={this.handleChange} id="country">
                <option hidden>Choose...</option>
                <option>England</option>
                <option>France</option>
                <option>Germany</option>
                <option>Holland</option>
                <option>Ireland</option>
                <option>Spain</option>
                <option>United States</option>
              </Input>
            </Col>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input type="checkbox" name="tAndC" checked={this.state.tAndC} onChange={this.handleChange} id="tAndC" />{' '}
              I agree to MYtinerary's Terms & Conditions
            </Label>
          </FormGroup>
          <Button>OK</Button>
          <Input type="submit" />
          <Input type="reset" />
        </Form>
      </section>
    );
  }
}

export default Signup;
