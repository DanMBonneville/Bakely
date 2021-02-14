import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

//import * as actions from './store/actions/index';

import Layout from "./hoc/Layout/Layout";
import HomePage from "./containers/HomePage/HomePage";
import Login from "./containers/Login/Login";
import Logout from "./containers/Logout/Logout";
import VendorSignUp from "./containers/SignUp/VendorSignUp/VendorSignUp";
import CustomerSignUp from "./containers/SignUp/CustomerSignUp/CustomerSignUp";

class App extends Component {
    render() {
        // to do -- lazy loading
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
                <Layout isAuthenticated={this.props.isAuthenticated}>
                    {routes}
                </Layout>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        //isAuthenticated: typeof state.user !== 'undefined'
    };
};

const mapDispatchToProps = dispatch => {
    return {
        //onTryAutoSignup: () => dispatch(actions.authListener())
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
