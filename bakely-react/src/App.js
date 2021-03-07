import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import asyncComponent from './hoc/asyncComponent/asyncComponent';

import Layout from "./hoc/Layout/Layout";
import HomePage from "./containers/HomePage/HomePage";
import Logout from "./containers/Logout/Logout";

const asyncLogin = asyncComponent(()=> {
    return import("./containers/Login/Login");
});

const asyncUserRoleToggle = asyncComponent(()=> {
    console.log("asycn vendor toggle");
    return import("./containers/VendorSignUp/VendorSignUp");
});

class App extends Component {
    render() {
        let routes = (
            <Switch>
                <Route path="/login" component={asyncLogin} />
                <Route path="/logout" component={Logout} />
                <Route path="/toggle-user-role" component={asyncUserRoleToggle} />
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

export default withRouter(App);
