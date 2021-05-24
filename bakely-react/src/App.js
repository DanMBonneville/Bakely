import React, { Component } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";

import asyncComponent from "./hoc/asyncComponent/asyncComponent";
import Layout from "./hoc/Layout/Layout";
import HomePage from "./containers/HomePage/HomePage";

const asyncLogin = asyncComponent(() => {
  return import("./containers/Login/Login");
});
const asyncLogout = asyncComponent(() => {
  return import("./containers/Logout/Logout");
});
const asyncSearchResults = asyncComponent(() => {
  return import("./containers/SearchResults/SearchResults");
});
const asyncCheckout = asyncComponent(() => {
  return import("./containers/Checkout/Checkout");
});
const asyncVendorMenu = asyncComponent(() => {
  return import("./containers/VendorMenu/VendorMenu");
});
const asyncMenuItemProfile = asyncComponent(() => {
  return import("./containers/Profiles/MenuItemProfile/MenuItemProfile");
});
const asyncVendorProfile = asyncComponent(() => {
  return import("./containers/Profiles/VendorProfile/VendorProfile");
});
const asyncUserRoleToggle = asyncComponent(() => {
  return import("./containers/VendorSignUp/VendorSignUp");
});
const asyncPayments = asyncComponent(()=> {
    return import("./containers/Payments/Payments");
});

class App extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route path="/login" component={asyncLogin} />
          <Route path="/logout" component={asyncLogout} />
          <Route path="/searchResults" component={asyncSearchResults} />
          <Route path="/checkout" component={asyncCheckout} />
          <Route path="/my_menu" component={asyncVendorMenu} />
          <Route path="/viewMenuItemProfile" component={asyncMenuItemProfile} />
          <Route path="/viewVendorProfile" component={asyncVendorProfile} />
          <Route path="/toggle-user-role" component={asyncUserRoleToggle} />
          <Route path="/payments" component={asyncPayments} />
          <Route path="/" exact component={HomePage} />  
          <Redirect to="/" />
        </Switch>
      </Layout>
    );
  }
}

export default withRouter(App);
