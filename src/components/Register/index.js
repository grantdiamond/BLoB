import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import * as routes from '../../constants/routes';

const Registration = () => (
  <div>
    <h1>Register</h1>
    <br />
    <RegistrationFormWrapped />
  </div>
);

const initialState = {
  email: '',
  passwordInitial: '',
  passwordConfirm: '',
  error: null
};

class RegistrationForm extends Component {
  constructor(props) {
    super(props);
    this.state = { ...initialState };
  }

  onSubmit = event => {
    const { email, passwordInitial } = this.state;
    this.props.firebase
      .createUser(email, passwordInitial)
      .then(authUser => {
        let uID = authUser.user.uid;
        this.props.firebase.users(uID).set({
          email, 
        });
      })
      .then(authUser => {
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
    const { email, passwordInitial, passwordConfirm, error } = this.state;

    const isNotValid =
      passwordInitial !== passwordConfirm ||
      passwordInitial === '' ||
      email === '';

    return (
      <form onSubmit={this.onSubmit}>
        <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address:"
        />

        <input
          name="passwordInitial"
          value={passwordInitial}
          onChange={this.onChange}
          type="password"
          placeholder="Password:"
        />

        <input
          name="passwordConfirm"
          value={passwordConfirm}
          onChange={this.onChange}
          type="password"
          placeholder="Re-enter Password:"
        />

        <button disabled={isNotValid} type="submit">
          Register
        </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const RegistrationLink = () => (
  <p>
    Register <Link to={routes.register}>here</Link>
  </p>
);

const RegistrationFormWrapped = withRouter(withFirebase(RegistrationForm));

export default Registration;

export { RegistrationFormWrapped, RegistrationLink };
