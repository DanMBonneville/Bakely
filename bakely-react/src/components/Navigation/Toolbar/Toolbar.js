import React from 'react';

import classes from './Toolbar.css';


function handleLink(){
    console.log("open shopping cart here");
}

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <div className={classes.inputWithIcon}>
            <input type="text" placeholder={"Search"} required/>
            <i class="fa fa-search" ></i>
        </div>
        <button className={classes.block} onClick={() => handleLink()}>
            <i class="fa fa-shopping-cart" aria-hidden="true"></i></button>
    </header>
);

export default toolbar;