import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { RegistrationLink } from '../Register';
import { withFirebase } from '../Firebase';
import * as routes from '../../constants/routes';
import { PasswordForgetLink } from '../Forget';

const Login = () => (
  <div>
    <h1>Log In:</h1>
    <LoginFormWrapped />
    <PasswordForgetLink />
    <RegistrationLink />
  </div>
);

const initialState = {
  email: '',
  password: '',
  error: null,
  response: null
};

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...initialState };
  }

  onSubmit = event => {
    const { email, password } = this.state;

    this.setState({ response: 'One moment please...' });
    this.props.firebase
      .signIn(email, password)
      .then(() => {
        this.setState({ ...initialState });
        this.props.history.push(routes.splash);
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, error, response } = this.state;

    const isInvalid = password === '' || email === '';

    return (
      <form onSubmit={this.onSubmit}>
        <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <input
          name="password"
          value={password}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
        <button disabled={isInvalid} type="submit">
          Sign In
        </button>
        <div style={{ height: '50px' }}>
          {error && <p>{error.message}</p>}
          {response && !error && <p>{response}</p>}
        </div>
      </form>
    );
  }
}

export default Login;

const LoginFormWrapped = withRouter(withFirebase(LoginForm));

export { LoginFormWrapped };
