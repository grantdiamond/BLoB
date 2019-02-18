import React, { Component } from 'react';
import { withFirebase } from '../../Firebase';
import Tag from './Tag';

class TagList extends Component {

  render() {
    let tags = this.props.tags
    if (tags === null || tags === undefined) {
      tags = []
    }
    return (
      <div>
        {tags.map(tag => (
          <>
            <Tag key={tag} tag={tag} title={this.title} />
            <br />
          </>
        ))}
      </div>
    );
  }
}

export default withFirebase(TagList);
