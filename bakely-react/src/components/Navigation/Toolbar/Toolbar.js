import React, {useState} from 'react';
import Logo from '../../Logo/Logo';
import classes from './Toolbar.css';
import { Redirect } from 'react-router-dom';


const toolbar = (props) => {
    const [redirect, setRedirect] = useState(null);

    const handleLink = () => {
        let path = '/checkout';
        setRedirect(<Redirect to={path} />);
    }
    return (
    <header className={classes.Toolbar}>
        {redirect}
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