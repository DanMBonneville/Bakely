import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import Logo from '../../Logo/Logo';
import classes from './Toolbar.css';
import HamburgerMenu from '../SideDrawer/HamburgerMenu/HamburgerMenu';

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
            <HamburgerMenu
                openSideDrawer={props.openSideDrawer}
                sideDrawerOpen={false}
            />
            <Logo />
            <button className={classes.searchButton} onClick={() => openSearchBar()}>
                <i className="fa fa-search" ></i>
            </button>
            <button className={classes.block} onClick={() => handleLink(checkoutPath)}>
                <i className="fa fa-shopping-cart" aria-hidden="true"></i></button>
        </header>
    )
};

export default toolbar;