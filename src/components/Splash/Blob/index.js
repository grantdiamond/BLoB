import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../../Firebase';
import TagForm from '../TagForm';
import TagList from '../TagList';

let initialState = {
  body: '',
  tags: null,
  annotations: []
};

class Blob extends Component {
  constructor(props) {
    super(props);
    this.state = { ...initialState };
    this.bID = this.props.match.params.bID;
    this.uID = this.props.firebase.auth.currentUser.uid;
    this.title = this.props.location.state.title;
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    let query = this.props.firebase.blobs(this.bID);
    query.on('value', data => {
      let blob = data.val();
      let annotations = {};
      let tags = [];
      if (blob.annotations) annotations = blob.annotations;
      if (blob.tags) tags = Object.keys(blob.tags);
      this.setState({
        body: blob.body,
        annotations: annotations,
        tags: tags
      });
    });
  }

  render() {
    let { tags } = this.state;
    return (
      <>
        <h2>{this.title}</h2>
        <p>{this.state.body}</p>
        <br />
        <TagForm tags={tags} bID={this.bID} uID={this.uID} title={this.title} />
        <br />
        {tags && (
          <>
            <div style={{ fontSize: '22px' }}>Tags for this BLoB:</div>
            <br />
            <TagList
              tags={tags}
              bID={this.bID}
              uID={this.uID}
              title={this.title}
            />
          </>
        )}
      </>
    );
  }
}

export default withFirebase(withRouter(Blob));
