import React, { Component } from 'react';
import * as routes from '../../constants/routes';

import { withFirebase } from '../Firebase';

const initialState = {
  passwordInitial: '',
  passwordConfirm: '',
  error: null
};

class PasswordChangeForm extends Component {
  constructor(props) {
    super(props);
    this.state = { ...initialState };
  }

  onSubmit = event => {
    const { passwordInitial } = this.state;

    this.props.firebase
      .changePassword(passwordInitial)
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
    const { passwordInitial, passwordConfirm, error } = this.state;

    const isInvalid =
      passwordInitial !== passwordConfirm || passwordInitial === '';

    return (
      <form onSubmit={this.onSubmit}>
        <input
          name="passwordInitial"
          value={passwordInitial}
          onChange={this.onChange}
          type="password"
          placeholder="New Password"
        />
        <input
          name="passwordConfirm"
          value={passwordConfirm}
          onChange={this.onChange}
          type="password"
          placeholder="Confirm New Password"
        />
        <button disabled={isInvalid} type="submit">
          Reset Password and Log In
        </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

export default withFirebase(PasswordChangeForm);
