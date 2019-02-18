import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import LogOutButton from '../Logout';
import Login from '../Login';
import CreateBlob from '../Splash/CreateBlob';
import Reset from '../Reset';
import Forget from '../Forget';
import Register from '../Register';
import Splash from '../Splash';
import Blob from '../Splash/Blob';
import InvertedTag from '../Splash/InvertedTag';

import * as routes from '../../constants/routes';
import { withAuth, AuthUserContext } from '../Session';

let currentHomeRoute = Login;
let currentBlobRoute = Blob;
let currentCreateBlobRoute = CreateBlob;

const AllRoutes = () => (
  <div>
    <Route exact path="/" component={currentHomeRoute} />
    <Route path={routes.splash} component={currentHomeRoute} />
    <Route path={routes.login} component={Login} />
    <Route path={routes.createBlob} component={currentCreateBlobRoute} />
    <Route path={routes.reset} component={Reset} />
    <Route path={routes.forget} component={Forget} />
    <Route path={routes.register} component={Register} />
    <Route path={routes.blob} component={currentBlobRoute} />
    <Route path={routes.invertedTag} component={InvertedTag} />
  </div>
);

const Loading = () => (
  <div style={{ height: '20px' }}>
    <h1>LOADING</h1>
  </div>
);

const App = props => (
  <Router>
    <div>
      <div style={{ height: '20px' }}>
        <AuthUserContext.Consumer>
          {authUser => authUser && <LogOutButton />}
        </AuthUserContext.Consumer>
      </div>

      <Link to="/">
        <div style={{ fontSize: '66px' }}>
          BL<b>o</b>B
        </div>
      </Link>

      <AuthUserContext.Consumer>
        {authUser => {
          if (authUser) {
            currentHomeRoute = Splash;
            currentBlobRoute = Blob;
            currentCreateBlobRoute = CreateBlob;
          } else if (authUser === false) {
            // authUser = null;
            // return <Redirect to='/' />
            currentHomeRoute = Login;
            currentBlobRoute = Login;
            currentCreateBlobRoute = Login;
          } else if (authUser === null) {
            return <Loading />;
          }
          return <AllRoutes />;
        }}
      </AuthUserContext.Consumer>
    </div>
  </Router>
);

export default withAuth(App);
