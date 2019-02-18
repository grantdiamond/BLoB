import React, { Component } from 'react';
import BlobListItem from './BlobListItem';
import { BlobBuilderLink } from './CreateBlob';
import TagList from './TagList';
import { withFirebase } from '../Firebase';

const NewBlob = () => (
  <div>
    <BlobBuilderLink />
  </div>
);

class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blobs: [],
      invertedTags: [],
      loading: true
    };
    this.uid = this.props.firebase.auth.currentUser.uid;
  }

  componentDidMount() {
    let path = this.uid;
    let query = this.props.firebase.users(path);
    query.on('value', response => {
      let data = response.val();
      let blobs = data.blobTitles;
      let tags = data.invertedTags;
      if (!data.blobTitles) {
        blobs = [];
      }
      if (!data.invertedTags) {
        tags = [];
      }
      this.setState({
        blobs: blobs,
        invertedTags: Object.keys(tags),
        loading: false
      });
    });
  }

  render() {
    const blobsTuples = Object.entries(this.state.blobs);
    const tags = this.state.invertedTags;
    return (
      <div>
        <h1>Splash-Landing Page</h1>
        <NewBlob />
        <br />
        <div style={{ fontSize: '36px' }}>
          my BL<b>o</b>Bs:
        </div>
        <br />
        {this.state.loading ? (
          <div>loading...</div>
        ) : (
          blobsTuples.map(blob => (
            <div key={blob[0]}>
              <BlobListItem bID={blob[0]} title={blob[1]} />
              <br />
            </div>
          ))
        )}
        <br />
        {tags.length > 0 && (
          <>
            <div style={{ fontSize: '22px' }}>my Tags:</div>
            <br />
            <TagList tags={tags} />
          </>
        )}
      </div>
    );
  }
}

export default withFirebase(SplashScreen);
