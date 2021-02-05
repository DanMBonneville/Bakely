import React, { Component } from 'react';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import classes from './HomePage.css';
// import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import pixeltrue_healthy_eating from "../../assets/images/pixeltrue-healthy-eating.png";
import pixeltrue_location from "../../assets/images/pixeltrue-location.png";
import pixeltrue_meditation from "../../assets/images/pixeltrue-meditation.png";
import pixeltrue_seo from "../../assets/images/pixeltrue-seo.png";
import pixeltrue_special_deals from "../../assets/images/pixeltrue-special-deals.png";
/*
import { connect } from 'react-redux';


import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';

*/

class HomePage extends Component {


    render() {

        return (
            <Container>
                <Grid container spacing={1}>
                    <Grid item xs={5}>
                        <div style ={{color:"black", textAlign:"right", fontSize:"3vw"}}>Homeade food,</div>
                        <div style={{textAlign:"right", fontSize:"3vw", marginBottom:"25px"}}> delivered.</div>
                        <div style ={{color:"black", textAlign:"right"}}>explore home restaurants in your area</div>
                        <div className={classes.inputWithIcon}>
                            <input type="text" placeholder={"enter your address"} required/>
                            <i class="fa fa-location-arrow" ></i>
                        </div>
                    </Grid>
                    <Grid item xs={7}>
                        <img src={pixeltrue_healthy_eating} width="80%" alt="Healthy living"/>
                    </Grid>
                    <Grid item xs={12}>
                        <div style={{fontSize: '2vw', textAlign:"center"}}>How Bakely works</div>
                    </Grid>
                    <Grid item xs={4}>
                        <img src={pixeltrue_seo} width="80%" alt="Healthy living"/>
                        <div className={classes.minorText}>Browse home restaurants</div>
                        <div className={classes.subMinorText}>Explore local food prepared by permitted home bakers near you </div>
                    </Grid>
                    <Grid item xs={4}>
                        <img src={pixeltrue_location} width="80%" alt="Location"/>
                        <div className={classes.minorText}>Place your order</div>
                        <div className={classes.subMinorText}>Pick from unique home menus you can’t find anywhere else</div>
                    </Grid>
                    <Grid item xs={4}>
                        <img src={pixeltrue_special_deals} width="80%" alt="Healthy living"/>
                        <div className={classes.minorText}>Get your food</div>
                        <div className={classes.subMinorText}>Have it delivered to your door or pick it up yourself</div>
                    </Grid>
                </Grid>
                
                
               
            </Container>
            
        );
    }
}

export default HomePage;