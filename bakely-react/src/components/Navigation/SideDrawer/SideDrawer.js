import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import classes from './SideDrawer.css';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';


const sideDrawer = ( props ) => {

    // used to switch styles based on user options
    const onStyle = {
        borderBottom: '4px solid black'
    }
    const offStyle = {
        borderBottom: '1px solid black'
    }

    const [redirect, setRedirect] = useState(null);
    const [isBakeOptions, setIsBakeOptions] = useState(false);
    const [eatStyle, setEatStyle] = useState(onStyle);
    const [bakeStyle, setBakeStyle] = useState(offStyle);

    function setEatItems() {
        setEatStyle(onStyle);
        setBakeStyle(offStyle);
        setIsBakeOptions(false);
    }
    function setBakeItems() {
        setBakeStyle(onStyle);
        setEatStyle(offStyle);
        setIsBakeOptions(true);
    }

    function goToSignIn(e){
        e.preventDefault();
        setRedirect(<Redirect to={'/login'} />) 
    }

    let attachedClasses = [classes.SideDrawer, classes.Close];
    if (props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }

    return (
        <Auxiliary>
            {redirect}
            <Backdrop show={props.open} clicked={props.closed}/>
            <Container disableGutters maxWidth={'xs'} className={attachedClasses.join(' ')}>
                {props.isLoggedIn ? 
                <Auxiliary className={classes.drawerWrapper}>
                    {/* //TODO  ternary expression for if a user is a customer and not a baker */}
                    <Grid container spacing={0} >
                        <Grid item xs={6}>
                            <button style={eatStyle} onClick={setEatItems} className={classes.block}> Eat </button>
                        </Grid>
                        <Grid item xs={6}>
                           <button style={bakeStyle} className={classes.block} onClick={setBakeItems}> Bake </button>
                        </Grid>
                    </Grid>
                    <Grid container spacing={0}>
                        <Grid item xs={12}>
                            <NavigationItems close={props.closed} isBakeOptions={isBakeOptions} className={classes.block} />
                        </Grid>
                    </Grid>
                </Auxiliary>:
                // unimplimented
                <Auxiliary className={classes.drawerWrapper}>
                    <Grid container spacing={2} onClick={props.closed} >
                        <Grid item xs={12} >
                            <button onClick={goToSignIn} className={classes.signIn}> Sign in </button>
                        </Grid>
                    </Grid>
                </Auxiliary>
                
                }
            </Container>
        </Auxiliary>
    );
};

export default sideDrawer;