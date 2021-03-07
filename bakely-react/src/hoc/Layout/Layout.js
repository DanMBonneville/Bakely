import React, { Component } from 'react';
import { connect } from 'react-redux';
import Container from '@material-ui/core/Container';

import * as actions from '../../store/actions/index';
import Auxiliary from '../Auxiliary/Auxiliary';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    componentDidMount() {
        this.props.onAuthStateChanged();
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
        return (
            <Auxiliary>
                <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} />
                <SideDrawer
                    className={classes.sideDrawer}
                    userData={this.props.userData}
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
        isAuthenticated: state.auth.user ? true : false,
        user: state.auth.user,
        userData: state.user.userData
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuthStateChanged: () => dispatch(actions.authListener())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);