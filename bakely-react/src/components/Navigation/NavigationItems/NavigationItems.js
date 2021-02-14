import React, {useState} from 'react';
import { Redirect } from 'react-router-dom';

import classes from './NavigationItems.css';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

const navigationItems = (props) => {

    const [redirect, setRedirect] = useState(null);

    const handleLink = (chosenLink) => {
    console.log("just Checking", chosenLink);
    let path = "/";
    switch (chosenLink) {
        // Bake only
        case 'My_Kitchen': ;
            break;
        // Eat only
        case 'Home': path = "/";
            break;
        case 'Payment': path = "/";
            break;
        // sared
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
    setRedirect(<Redirect to={path} />);
    }

    return (
        <Auxiliary>
            {redirect}
            {props.isBakeOptions ?
                <Container disableGutters onClick={props.close}>
                    <Grid container spacing={0}>
                        <Grid item xs={12}>
                            <button className={classes.block} onClick={() => handleLink('My_Kitchen')}>
                                <i class="fa fa-cutlery" aria-hidden="true"></i> My Kitchen</button>
                        </Grid>
                        <Grid item xs={12} >
                            <button className={classes.block} onClick={() => handleLink('Orders')}>
                                <i class="fa fa-bookmark-o" aria-hidden="true"></i> Orders</button>
                        </Grid>
                        <Grid item xs={12} >
                            <button className={classes.block} onClick={() => handleLink('Chat')}>
                                <i class="fa fa-comments-o" aria-hidden="true"></i> Chat</button>
                        </Grid>
                        <Grid item xs={12} >
                            <button className={classes.block} onClick={() => handleLink('Help')}>
                                <i class="fa fa-question-circle" aria-hidden="true"></i> Help</button>
                        </Grid>
                        <Grid item xs={12} >
                            <button className={classes.block} onClick={() => handleLink('Account')}>
                                <i class="fa fa-user" aria-hidden="true"></i> Account</button>
                        </Grid>
                        <Grid item xs={12} >
                            <button className={classes.block} onClick={() => handleLink('Sign_Out')}>
                                <i class="fa fa-sign-out" aria-hidden="true"></i> Sign Out</button>
                        </Grid>
                    </Grid>
                </Container> :
                <Container disableGutters onClick={props.close}>
                    <Grid container spacing={0}>
                        <Grid item xs={12} >
                            <button className={classes.block} onClick={() => handleLink('Home')}>
                                <i class="fa fa-home"> </i> Home</button>
                        </Grid>
                        <Grid item xs={12} >
                            <button className={classes.block} onClick={() => handleLink('Chat')}>
                                <i class="fa fa-comments-o" aria-hidden="true"></i> Chat</button>
                        </Grid>
                        <Grid item xs={12} >
                            <button className={classes.block} onClick={() => handleLink('Orders')}>
                                <i class="fa fa-bookmark-o" aria-hidden="true"></i> Orders</button>
                        </Grid>
                        <Grid item xs={12} >
                            <button className={classes.block} onClick={() => handleLink('Payment')}>
                                <i class="fa fa-money" aria-hidden="true"></i> Payment</button>
                        </Grid>
                        <Grid item xs={12} >
                            <button className={classes.block} onClick={() => handleLink('Help')}>
                                <i class="fa fa-question-circle" aria-hidden="true"></i> Help</button>
                        </Grid>
                        <Grid item xs={12} >
                            <button className={classes.block} onClick={() => handleLink('Account')}>
                                <i class="fa fa-user" aria-hidden="true"></i> Account</button>
                        </Grid>
                        <Grid item xs={12} >
                            <button className={classes.block} onClick={() => handleLink('Sign_Out')}>
                                <i class="fa fa-sign-out" aria-hidden="true"></i> Sign Out</button>
                        </Grid>
                    </Grid>
                </Container>
            }
        </Auxiliary>
    )
};

export default navigationItems;