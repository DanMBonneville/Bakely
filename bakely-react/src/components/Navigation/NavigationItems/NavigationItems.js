import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = () => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" active>Home</NavigationItem>
        <NavigationItem link="/shef-sign-up">Shef Sign up</NavigationItem>
        <NavigationItem link="/cust-sign-up">Customer Sign up</NavigationItem>
    </ul>
);

export default navigationItems;