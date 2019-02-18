import React, { Component } from 'react';
import BlobListItem from '../BlobListItem';
import { withFirebase } from '../../Firebase';

class InvertedTag extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blobs: {}
    };
    this.tag = this.props.location.state.invertedTag;
    this.uid = this.props.firebase.auth.currentUser.uid;
  }

  componentDidMount() {
    let path = this.uid + '/invertedTags/' + this.tag;
    let query = this.props.firebase.users(path);
    query.on('value', data => {
      let blobs = data.val();
      if (!blobs) {
        blobs = [];
      }
      this.setState({ blobs: blobs });
    });
  }

  render() {
    const blobsTuples = Object.entries(this.state.blobs);
    return (
      <div>
        <h1>Blobs matching tag {this.tag}:</h1>
        <br />
        {blobsTuples.map(blob => (
          <div key={blob[0]}>
            <BlobListItem bID={blob[0]} title={blob[1]} />
            <br />
          </div>
        ))}
      </div>
    );
  }
}

export default withFirebase(InvertedTag);
