import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from '../routes/Auth';
import Home from '../routes/Home';
import Navigation from "./Navigation";
import Profile from "../routes/Profile";
import React from "react";

const AppRouter = (props) => {

  return (
    <Router>
      { props.isLoggedIn && <Navigation userObj={props.userObj} /> }
      <Switch>
        { props.isLoggedIn ? (
          <div style={{
            maxWidth: 890,
            width: "100%",
            margin: "0 auto",
            marginTop: 80,
            display: "flex",
            justifyContent: "center"
          }}>
            <Route path='/' exact>
              <Home userObj={props.userObj} />
            </Route>
            <Route path='/profile' exact>
              <Profile userObj={props.userObj} refreshUser={props.refreshUser} />
            </Route>
          </div>
        ) : (
          <Route path='/' exact>
            <Auth />
          </Route>
        ) }
      </Switch>
    </Router>
  )
};

export default AppRouter;