import React from 'react';
import { withRouter } from 'react-router-dom';

import classes from './NavigationItems.css';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

const navigationItems = (props) => {
    const handleLink = (chosenLink) => {
    let path = "/";
    switch (chosenLink) {
        // Bake only
        case 'My_Menu': path = 'my_menu';
            break;
        // Eat only
        case 'Home': path = "/";
            break;
        case 'Payment': path = "/checkout";
            break;
        // shared
        case 'Orders': path = "/";
            break;
        case 'Chat': path = "/";
            break;
        case 'Help': path = "/";
            break;
        case 'Account': path = "/";
            break;
        case 'Sign_Out': path = "/logout";
            break;
        default: path = "/";
    }
    props.history.push(path);
    }

    return (
        <Auxiliary>
            {props.isBakeOptions ?
                <Container disableGutters onClick={props.close}>
                    <Grid container spacing={0}>
                        <Grid item xs={12}>
                            <button className={classes.block} onClick={() => handleLink('My_Menu')}>
                                <i className="fa fa-cutlery" aria-hidden="true"></i> My Menu</button>
                        </Grid>
                        <Grid item xs={12} >
                            <button className={classes.block} onClick={() => handleLink('Orders')}>
                                <i className="fa fa-bookmark-o" aria-hidden="true"></i> Orders</button>
                        </Grid>
                        <Grid item xs={12} >
                            <button className={classes.block} onClick={() => handleLink('Chat')}>
                                <i className="fa fa-comments-o" aria-hidden="true"></i> Chat</button>
                        </Grid>
                        <Grid item xs={12} >
                            <button className={classes.block} onClick={() => handleLink('Help')}>
                                <i className="fa fa-question-circle" aria-hidden="true"></i> Help</button>
                        </Grid>
                        <Grid item xs={12} >
                            <button className={classes.block} onClick={() => handleLink('Account')}>
                                <i className="fa fa-user" aria-hidden="true"></i> Account</button>
                        </Grid>
                        <Grid item xs={12} >
                            <button className={classes.block} onClick={() => handleLink('Sign_Out')}>
                                <i className="fa fa-sign-out" aria-hidden="true"></i> Sign Out</button>
                        </Grid>
                    </Grid>
                </Container> :
                <Container disableGutters onClick={props.close}>
                    <Grid container spacing={0}>
                        <Grid item xs={12} >
                            <button className={classes.block} onClick={() => handleLink('Home')}>
                                <i className="fa fa-home"> </i> Home</button>
                        </Grid>
                        <Grid item xs={12} >
                            <button className={classes.block} onClick={() => handleLink('Chat')}>
                                <i className="fa fa-comments-o" aria-hidden="true"></i> Chat</button>
                        </Grid>
                        <Grid item xs={12} >
                            <button className={classes.block} onClick={() => handleLink('Orders')}>
                                <i className="fa fa-bookmark-o" aria-hidden="true"></i> Orders</button>
                        </Grid>
                        <Grid item xs={12} >
                            <button className={classes.block} onClick={() => handleLink('Payment')}>
                                <i className="fa fa-money" aria-hidden="true"></i> Payment</button>
                        </Grid>
                        <Grid item xs={12} >
                            <button className={classes.block} onClick={() => handleLink('Help')}>
                                <i className="fa fa-question-circle" aria-hidden="true"></i> Help</button>
                        </Grid>
                        <Grid item xs={12} >
                            <button className={classes.block} onClick={() => handleLink('Account')}>
                                <i className="fa fa-user" aria-hidden="true"></i> Account</button>
                        </Grid>
                        <Grid item xs={12} >
                            <button className={classes.block} onClick={() => handleLink('Sign_Out')}>
                                <i className="fa fa-sign-out" aria-hidden="true"></i> Sign Out</button>
                        </Grid>
                    </Grid>
                </Container>
            }
        </Auxiliary>
    )
};

export default withRouter(navigationItems);