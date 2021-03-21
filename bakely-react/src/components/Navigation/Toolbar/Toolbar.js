import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';
import Logo from '../../Logo/Logo';
import classes from './Toolbar.css';
import HamburgerMenu from '../SideDrawer/HamburgerMenu/HamburgerMenu';


const toolbar = (props) => {
    const [redirect, setRedirect] = useState(null);

    const handleLink = () => {
        let path = '/checkout';
        setRedirect(<Redirect to={path} />);
    }
    return (
    <header className={classes.Toolbar}>
        <HamburgerMenu 
            drawerToggleClicked={props.drawerToggleClicked} 
            sideDrawerOpen={false}
        />
        <Logo />
        <div className={classes.inputWithIcon}>
            <input type="text" placeholder={"Search"} required/>
            <i className="fa fa-search" ></i>
        </div>
        <button className={classes.block} onClick={() => handleLink()}>
            <i className="fa fa-shopping-cart" aria-hidden="true"></i></button>
    </header>
    )
};

export default toolbar;