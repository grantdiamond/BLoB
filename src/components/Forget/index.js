import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import * as routes from '../../constants/routes';

const PasswordForgetPage = () => (
  <div>
    <h1>Reset your password:</h1>
    <PasswordForget />
  </div>
);

const initialState = {
  email: '',
  emailAccepted: null,
  error: null,
  timeUntilRedirect: 5
};

class PasswordForgetForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...initialState };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.countdown = this.countdown.bind(this);
  }

  handleSubmit = event => {
    const { email } = this.state;

    this.props.firebase
      .resetPassword(email)
      .then(() => {
        this.setState({
          ...initialState,
          emailAccepted: true
        });
        this.countdown();
        setTimeout(() => {
          this.props.history.push("/");
        }, 5000);
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  countdown = () => {
    let timer = setInterval(() => {
      let next = this.state.timeUntilRedirect - 1;
      this.setState({ timeUntilRedirect: next });
      if (this.state.timeUntilRedirect <= 1) {
        clearInterval(timer);
      }
    }, 1000);
  };

  render() {
    const { email, emailAccepted, error, timeUntilRedirect } = this.state;
    const isInvalid = email === '';

    return (
      <form onSubmit={this.handleSubmit}>
        <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <button disabled={isInvalid} type="submit">
          Reset My Password
        </button>
        {/* if there's an error or message from the server, display it */}
        {error && <p>{error.message}</p>}
        {emailAccepted && (
          <p>
            Check your email for a link to reset your password. Redirecting in{' '}
            <b>{timeUntilRedirect}</b>...
          </p>
        )}
      </form>
    );
  }
}

const PasswordForgetLink = () => (
  <p>
    <Link to={routes.forget}>Forgot Password?</Link>
  </p>
);

export default PasswordForgetPage;

const PasswordForget = withRouter(withFirebase(PasswordForgetForm));

export { PasswordForgetForm, PasswordForgetLink };
