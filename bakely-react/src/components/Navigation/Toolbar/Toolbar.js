import React from 'react';
import Logo from '../../Logo/Logo';
import classes from './Toolbar.css';


function handleLink(){
    console.log("open shopping cart here");
}

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <Logo />
        <div className={classes.inputWithIcon}>
            <input type="text" placeholder={"Search"} required/>
            <i className="fa fa-search" ></i>
        </div>
        <button className={classes.block} onClick={() => handleLink()}>
            <i className="fa fa-shopping-cart" aria-hidden="true"></i></button>
    </header>
);

export default toolbar;