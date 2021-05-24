import React from 'react';
import { withRouter }  from 'react-router-dom';
import Logo from '../../Logo/Logo';
import classes from './Toolbar.css';
import HamburgerMenu from '../SideDrawer/HamburgerMenu/HamburgerMenu';
import { Grid } from '@material-ui/core';

const toolbar = (props) => {

    //const checkoutPath = '/checkout';
    const openSearchBar = () => {
        props.openSearchBar();
    }

    const handleLink = (path) => {
        props.history.push(path); 
    }

    return (
        <header className={classes.Toolbar}>
            <Grid 
                container
                disablegutters="true"
                justifycontent="center"
                alignContent="center"
            >
                <Grid
                    item 
                    xs={2}
                    md={1}
                    justifycontent={'center'}
                >
                    <HamburgerMenu
                        openSideDrawer={props.openSideDrawer}
                        sideDrawerOpen={false}
                    />
                </Grid>
                <Grid item xs={6} md={9}>
                    <Logo />
                </Grid>
                <Grid item xs={2} md={1}>
                    <button 
                        className={classes.toolBarIcon} 
                        onClick={() => openSearchBar()}>
                        <i className="fa fa-search" ></i>
                    </button>
                </Grid>
                <Grid item xs={2} md={1}>
                    <button 
                        className={classes.toolBarIcon} 
                        onClick={() => handleLink()}
                        style={{'backgroundColor': '#FA541C'}}
                    >
                        <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                    </button>
                </Grid>
            </Grid>
        </header>
    )
};

export default withRouter(toolbar);