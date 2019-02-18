import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../../Firebase';

class TagForm extends Component {
  constructor(props) {
    super(props);
    this.bID = this.props.match.params.bID;
    this.uID = this.props.firebase.auth.currentUser.uid;
    this.state = {
      addTag: ''
    };
    this.submitTag = this.submitTag.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  submitTag(event) {
    let tag = this.state.addTag;
    let newTag = { [tag]: true };
    let path = this.props.bID + '/tags';
    let query = this.props.firebase.blobs(path);
    query
      .update(newTag)
      .then(response => {
        let newInvertedTag = { [this.bID]: this.props.title };
        let path = this.props.uID + '/invertedTags/' + tag;
        let query = this.props.firebase.users(path);
        query.update(newInvertedTag);
      })
      .then(response => {
        console.log(response);
      });
    event.preventDefault();
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    const { addTag } = this.state;
    const isNotValid = addTag === '';
    return (
      <div>
        <form onSubmit={this.submitTag}>
          <input
            name="addTag"
            value={addTag}
            onChange={this.onChange}
            type="text"
            placeholder="New Tag"
          />
          <button disabled={isNotValid} type="submit">
            Add Tag
          </button>
        </form>
      </div>
    );
  }
}

export default withRouter(withFirebase(TagForm));
