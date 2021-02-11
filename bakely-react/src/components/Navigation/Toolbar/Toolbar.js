import React from 'react';

import classes from './Toolbar.css';
// import Logo from '../../Logo/Logo';
import HamburgerMenu from 'react-hamburger-menu';
// import NavigationItems from '../NavigationItems/NavigationItems';
// import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';


function handleLink(){
    console.log("open shopping cart here");
}

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <HamburgerMenu
            isOpen={props.sideDrawerOpen}
            menuClicked={props.drawerToggleClicked}
            width={18}
            height={15}
            strokeWidth={1}
            rotate={.5}
            color='black'
            borderRadius={0}
            animationDuration={0.5}
        />
        {/* <div className={classes.Logo}>
            <Logo />
        </div> */}
        <div className={classes.inputWithIcon}>
            <input type="text" placeholder={"Search"} required/>
            <i class="fa fa-search" ></i>
        </div>
        <button className={classes.block} onClick={() => handleLink()}>
            <i class="fa fa-shopping-cart" aria-hidden="true"></i></button>
    </header>
);

export default toolbar;