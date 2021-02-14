import React, { Component } from 'react';
import { connect } from 'react-redux';
import Container from '@material-ui/core/Container';

import * as actions from '../../store/actions/index';
import HamburgerMenu from '../../components/Navigation/SideDrawer/HamburgerMenu/HamburgerMenu';
import Auxiliary from '../Auxiliary/Auxiliary';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    componentDidMount() {
        console.log("onTryAuto Sign Up is going in");
        this.props.onTryAutoSignup();
    }

    sideDrawerClosedHandler = () => {
        this.setState({ showSideDrawer: false });
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return { showSideDrawer: !prevState.showSideDrawer };
        });
    }

    render() {
        console.log("user is logged in: ", this.props.isAuthenticated);
        console.log("who it is: ", this.state.user);
        return (
            <Auxiliary>
                <HamburgerMenu 
                    drawerToggleClicked={this.sideDrawerToggleHandler} 
                    sideDrawerOpen={this.state.showSideDrawer}
                />
                <Toolbar />
                <SideDrawer
                    className={classes.sideDrawer}
                    isLoggedIn={this.props.isAuthenticated}
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHandler} />
                <Container maxWidth="md" className={classes.Content}>
                    {this.props.children}
                </Container>
            </Auxiliary>
        )
    }
}

const mapStateToProps = state => {
    return {
        // change this to accomidate firebase
        isAuthenticated: state.auth.user !== null,
        user: state.auth.user
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignup: () => dispatch(actions.authListener())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);