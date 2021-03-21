import React, {useState} from 'react';
import Logo from '../../Logo/Logo';
import classes from './Toolbar.css';
<<<<<<< HEAD
import { Redirect } from 'react-router-dom';
=======
import HamburgerMenu from '../SideDrawer/HamburgerMenu/HamburgerMenu';
>>>>>>> 4534a86b9c3beae44bdc7695623c05565cc311dd


const toolbar = (props) => {
    const [redirect, setRedirect] = useState(null);

    const handleLink = () => {
        let path = '/checkout';
        setRedirect(<Redirect to={path} />);
    }
    return (
    <header className={classes.Toolbar}>
<<<<<<< HEAD
        {redirect}
=======
        <HamburgerMenu 
            drawerToggleClicked={props.drawerToggleClicked} 
            sideDrawerOpen={false}
        />
>>>>>>> 4534a86b9c3beae44bdc7695623c05565cc311dd
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