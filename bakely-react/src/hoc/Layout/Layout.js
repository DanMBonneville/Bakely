import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import Container from '@material-ui/core/Container';

import * as actions from '../../store/actions/index';
import Auxiliary from '../Auxiliary/Auxiliary';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import SearchBar from '../../components/Navigation/SearchBar/SearchBar';

class Layout extends Component {
    state = {
        showSideDrawer: false,
        showSearchBar: false,
        goToSearchResults: false
    }
    componentDidMount() {
        this.props.onAuthStateChanged();
        this.props.setAllFoodItems();
        this.setState({
            goToSearchResults: false
        })
    }

    openSearchBar = () => { this.setState({ showSearchBar: true }) }
    closeSearchBar = () => { this.setState({ showSearchBar: false }) }
    openSideDrawer = () => { this.setState({ showSideDrawer: true }) }
    closeSideDrawer = () => { this.setState({ showSideDrawer: false }) };

    render() {
        return (
            <Auxiliary>
                <Toolbar
                    openSideDrawer={this.openSideDrawer}
                    openSearchBar={this.openSearchBar}
                />
                <SearchBar
                    drawerToggleClicked={this.searchBarToggleHandler}
                    open={this.state.showSearchBar}
                    setSearchValue={(value) => this.props.setSearchValue(value)}
                    closed={this.closeSearchBar}
                />
                <SideDrawer
                    className={classes.sideDrawer}
                    userData={this.props.userData}
                    isLoggedIn={this.props.isAuthenticated}
                    open={this.state.showSideDrawer}
                    closed={this.closeSideDrawer} />
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
        onAuthStateChanged: () => dispatch(actions.authListener()),
        setAllFoodItems: () => dispatch(actions.setAllFoodItems()),
        setSearchValue: (value) => dispatch(actions.setSearchValue(value))
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Layout));