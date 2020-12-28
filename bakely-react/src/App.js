import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from "./hoc/Layout/Layout";
import HomePage from "./containers/HomePage/HomePage";
import ShefSignUp from "./containers/SignUp/ShefSignUp/ShefSignUp";
import CustSignUp from "./containers/SignUp/CustSignUp/CustSignUp";
import Logout from './containers/Logout/Logout';

class App extends Component {
    render() {

        let routes = (
            <Switch>
                <Route path="/shef-sign-up" component={ShefSignUp} />
                <Route path="/cust-sign-up" component={CustSignUp} />
                <Route path="/logout" component={Logout} />
                <Route path="/" exact component={HomePage} />
                <Redirect to="/" />
            </Switch>
        );
        // to add: <Route path="/auth" component={asyncAuth} />
        //
        //
        //
        //
        return (
            <div>
                <Layout>
                    { routes }
                </Layout>
            </div>
        );
    }

    /*
     * 
     * When adding authorisation: 
     * 
     * const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch( actions.authCheckState() )
  };
};
     * 
     */
}

export default withRouter(connect(null,null)(App));
