import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';


const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" active>Home</NavigationItem>
        {props.isLoggedIn
            ? <NavigationItem link="/logout">logout</NavigationItem>
            : <Auxiliary>
                <NavigationItem link="/shef-sign-up">Bake with Us!</NavigationItem>
                <NavigationItem link="/login">login</NavigationItem>
                <NavigationItem link="/cust-sign-up">Customer Sign up</NavigationItem>
             </Auxiliary>
            // Ask Caleb how you would want to display this
        }
    </ul>
);

export default navigationItems;