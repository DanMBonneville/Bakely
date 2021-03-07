import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import classes from './SideDrawer.css';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';

import Grid from '@material-ui/core/Grid';

const sideDrawer = ( props ) => {

    const onStyle = {
        borderBottom: '4px solid black'
    }
    const offStyle = {
        borderBottom: '1px solid black'
    }
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
        props.history.push('/login'); 
    }

    let attachedClasses = [classes.SideDrawer, classes.Close];
    if (props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }
    let bakeEatSwitch = null;
    if(props.userData) {
        if(props.userData.role === ("vendor")){
            bakeEatSwitch = 
                <Grid container spacing={0} >
                    <Grid item xs={6}>
                        <button style={eatStyle} onClick={setEatItems} className={classes.block}> Eat </button>
                    </Grid>
                    <Grid item xs={6}>
                        <button style={bakeStyle} className={classes.block} onClick={setBakeItems}> Bake </button>
                    </Grid>
                </Grid> 
        }
    }
    return (
        <Auxiliary>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={attachedClasses.join(' ')}>
                {props.isLoggedIn ? 
                <Auxiliary >
                    {bakeEatSwitch}
                    <Grid container spacing={0}>
                        <Grid item xs={12}>
                            <NavigationItems close={props.closed} isBakeOptions={isBakeOptions} className={classes.block} />
                        </Grid>
                    </Grid>
                    <a href={"/toggle-user-role"}>Toggle Customer vs non customer</a>
                </Auxiliary>:
                <Auxiliary >
                    <Grid container spacing={2} onClick={props.closed} >
                        <Grid item xs={12} >
                            <button onClick={goToSignIn} className={classes.signIn}> Login </button>
                        </Grid>
                    </Grid>
                </Auxiliary>
                }
            </div>
        </Auxiliary>
    );
};

const mapStateToProps = state => {
    return {
        customer: state.user.userData
    };
};

export default withRouter(connect(mapStateToProps, null)(sideDrawer));