import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from "./hoc/Layout/Layout";
import HomePage from "./containers/HomePage/HomePage";
import Login from "./containers/Login/Login";
import Logout from "./containers/Logout/Logout";
import VendorSignUp from "./containers/SignUp/VendorSignUp/VendorSignUp";
import CustomerSignUp from "./containers/SignUp/CustomerSignUp/CustomerSignUp";

import * as actions from "./store/actions/index";

class App extends Component {
    render() {
        // to do -- lazy loading
        console.log("The user is authenticated : ", this.props.isAuthenticated);
        let routes = (
            <Switch>
                <Route path="/vendor-sign-up" component={VendorSignUp} />
                <Route path="/customer-sign-up" component={CustomerSignUp} />
                <Route path="/login" component={Login} />
                <Route path="/logout" component={Logout} />
                <Route path="/" exact component={HomePage} />
                <Redirect to="/" />
            </Switch>
        );

        return (
            <div>
                <Layout>
                    {routes}
                </Layout>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        // change this to accomidate firebase
        isAuthenticated: state.auth.token !== null
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // firebase autosign up?
        onTryAutoSignup: () => dispatch(actions.authCheckState())
    };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
