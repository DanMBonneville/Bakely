import React, { useState } from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
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

    let attachedClasses = [classes.SideDrawer, classes.Close];
    if (props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }
    return (
        <Container disableGutters className={attachedClasses.join(' ')}>
            <Grid container spacing={0} className={classes.userOption}>
                <Grid item xs={6}>
                    <button 
                        style={eatStyle}
                        className={classes.block}
                        onClick={setEatItems}>
                            Eat
                    </button>
                </Grid>
                <Grid item xs={6}>
                    <button
                        style={bakeStyle}
                        className={classes.block}
                        onClick={setBakeItems}>
                            Bake
                    </button>
                </Grid>
                
            </Grid>
            <Grid container spacing={0}>
                <Grid item xs={12}>
                    <NavigationItems 
                        close={props.closed} 
                        isBakeOptions={isBakeOptions} 
                        className={classes.block}
                    />
                </Grid>
            </Grid>
        </Container>
    );
};

export default sideDrawer;