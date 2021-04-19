import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import Logo from '../../Logo/Logo';
import classes from './Toolbar.css';
import HamburgerMenu from '../SideDrawer/HamburgerMenu/HamburgerMenu';
import { Grid } from '@material-ui/core';

const toolbar = (props) => {

    const checkoutPath = '/checkout';

    const [redirect, setRedirect] = useState(null);

    const openSearchBar = () => {
        props.openSearchBar();
    }

    const handleLink = (path) => {
        setRedirect(<Redirect to={path} />);
    }

    return (
        <header className={classes.Toolbar}>
            {redirect}
            <Grid 
                container
                disableGutters={true}
                justifyContent="center"
                alignContent="center"
            >
                <Grid
                    item 
                    xs={2}
                    md={1}
                    justify={'center'}
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
                        onClick={() => handleLink(checkoutPath)}
                        style={{'backgroundColor': '#FA541C'}}
                    >
                        <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                    </button>
                </Grid>
            </Grid>
        </header>
    )
};

export default toolbar;