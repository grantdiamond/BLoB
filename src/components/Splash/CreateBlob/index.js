import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import * as routes from '../../../constants/routes';
import { withAuth, AuthUserContext } from '../../Session';

const BlobBuilderPage = () => (
  <div>
    <h1>blob builder</h1>
    <br />
    <BlobBuilder />
  </div>
);

const initialState = {
  title: '',
  body: '',
  message: ''
};

class BlobBuilderForm extends Component {
  constructor(props) {
    super(props);
    this.uid = null;
    this.state = {
      ...initialState
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  handleSubmit(event) {
    this.setState({ message: 'sending blob............' });
    let { title, body } = this.state;
    let blob = {
      body: body,
      annotations: [],
      tags: {}
    }
    let path = this.uid + '/blobTitles';
    let query = this.props.firebase.users(path);
    query
      .push(title)
      .then(bID => {
        // let path = bID.key + '/body';
        // let query = this.props.firebase.blobs(path);
        // query.set(body);
        let path = bID.key;
        let query = this.props.firebase.blobs(path);
        query.set(blob)
      })
      .then(() => {
        this.props.history.push(routes.splash);
      })
      .catch(err => {
        console.log(err);
      });
    event.preventDefault();
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    const { title, body, message } = this.state;

    const isInvalid = title === '' || body === '';

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <>
            <input
              name="title"
              value={title}
              onChange={this.onChange}
              type="text"
              placeholder="Blob Title"
            />
            <br />
            <br />
            <textarea
              name="body"
              value={body}
              onChange={this.onChange}
              rows="15"
              cols="100"
              placeholder="Type your blob here"
            />
            <br />
            <br />
            <button disabled={isInvalid} type="submit">
              Build Blob
            </button>
          </>
          {message && <p>{message}</p>}
        </form>

        <AuthUserContext.Consumer>
          {authUser => {
            if (!this.uid && authUser) {
              this.uid = authUser.uid;
            }
          }}
        </AuthUserContext.Consumer>
      </div>
    );
  }
}

const BlobBuilderLink = () => (
  <div>
    <Link to={routes.createBlob}>Create New Blob</Link>
  </div>
);

export default BlobBuilderPage;

const BlobBuilder = withAuth(withRouter(BlobBuilderForm));

export { BlobBuilderForm, BlobBuilderLink };
