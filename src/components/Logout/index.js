import { withFirebase } from '../Firebase';
import React from 'react';
import { withRouter, Redirect } from 'react-router-dom';

const LogOutButton = (props) => (
<div style={{height: "20px"}}>
<button type="button" onClick={() => {
  props.firebase.signOut(() => 
  <Redirect to='/' />)
}}>
  Log Out
</button>
</div>
);

export default withRouter(withFirebase(LogOutButton));
