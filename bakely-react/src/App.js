import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';

import asyncComponent from './hoc/asyncComponent/asyncComponent';
import Layout from "./hoc/Layout/Layout";
import HomePage from "./containers/HomePage/HomePage";

const asyncLogin = asyncComponent(()=> {
    return import("./containers/Login/Login");
});
const asyncLogout = asyncComponent(()=> {
    return import("./containers/Logout/Logout");
});
const asyncSearchResults = asyncComponent(()=> {
    return import("./containers/SearchResults/SearchResults");
});
const asyncUserRoleToggle = asyncComponent(()=> {
    return import("./containers/VendorSignUp/VendorSignUp");
});
const asyncVendorMenu = asyncComponent(()=> {
    return import("./containers/VendorMenu/VendorMenu");
});
const asyncCheckout = asyncComponent(()=> {
    return import("./containers/Checkout/Checkout");
});
const asyncPayments = asyncComponent(()=> {
    return import("./containers/Payments/Payments");
});

class App extends Component {
    render() {
        let routes = (
            <Switch>
                <Route path="/login" component={asyncLogin} />
                <Route path="/logout" component={asyncLogout} />
                <Route path="/searchResults" component={asyncSearchResults} />
                <Route path="/checkout" component={asyncCheckout} />
                <Route path="/toggle-user-role" component={asyncUserRoleToggle} />
                <Route path="/my_menu" component={asyncVendorMenu} />
                <Route path="/payments" component={asyncPayments} />
                <Route path="/" exact component={HomePage} />
                <Redirect to="/" />
            </Switch>
        );
        return (
            <Layout>
                {routes}
            </Layout>
        );
    }
}

export default withRouter(App);
