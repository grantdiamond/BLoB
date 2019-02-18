import React from 'react';
import { Link } from 'react-router-dom'

const BlobListItem = props => (
  <Link key={props.bID} to={{
    pathname: `/blob/${props.bID}`,
    state: {
      blobs: props.blobs,
      title: props.title
    }
  }}>
  {props.title}
  </Link>
);



export default BlobListItem;
