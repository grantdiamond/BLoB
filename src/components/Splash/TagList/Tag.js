import React from 'react';
import { Link } from 'react-router-dom';

const Tag = props => (
  <Link to={{
    pathname: `/tag/${props.tag}`,
    state: {
      invertedTag: props.tag,
      title: props.title
    }
  }}>
  {props.tag}
  </Link>
);



export default Tag;