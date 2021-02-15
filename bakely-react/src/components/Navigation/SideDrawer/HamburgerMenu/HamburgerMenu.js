import React from 'react';
import HamburgerMenu from 'react-hamburger-menu';
import classes from './HamburgerMenu.css';

const hamburgerMenu = props => {
    return( 
        <div className={classes.HamburgerMenu}>
            <HamburgerMenu
                isOpen={props.sideDrawerOpen}
                menuClicked={props.drawerToggleClicked}
                strokeWidth={1}
                rotate={.5}
                color='black'
                borderRadius={0}
                animationDuration={0.5}
            />
        </div>
    );
}

export default hamburgerMenu;
