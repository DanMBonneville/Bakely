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
import pixeltrue_plan_1 from "../../assets/images/pixeltrue-plan-1.png";

/*
import { connect } from 'react-redux';


import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';

*/

class HomePage extends Component {


    render() {

        return (
            <Container maxWidth="md">
                <Grid container spacing={1}>
                    <Grid item xs={5}>
                        <div style ={{color:"black", textAlign:"right", fontSize:"3vw", paddingTop:"30px"}}>Homeade food,</div>
                        <div style={{textAlign:"right", fontSize:"3vw", marginBottom:"25px"}}> delivered.</div>
                        <div style ={{color:"black", textAlign:"center"}}>explore home restaurants in your area</div>
                        <div className={classes.inputWithIcon}>
                            <input type="text" placeholder={"enter your address"} required/>
                            <i class="fa fa-location-arrow" ></i>
                        </div>
                    </Grid>
                    <Grid item xs={7}>
                        <img src={pixeltrue_healthy_eating} width="80%" alt="Healthy living" class="center"/>
                    </Grid>
                </Grid>
                <Grid container spacing={1} style={{textAlign: "center"}}>
                    <Grid item xs={12}>
                        <div className={classes.headerText}>How Bakely works</div>
                    </Grid>
                    <Grid item xs={4}>
                        <img src={pixeltrue_seo} width="80%" alt="Healthy living" class="center"/>
                        <div className={classes.minorText}>Browse home restaurants</div>
                        <div className={classes.subMinorText}>Explore local food prepared by permitted home bakers near you </div>
                    </Grid>
                    <Grid item xs={4}>
                        <img src={pixeltrue_location} width="80%" alt="Location" class="center"/>
                        <div className={classes.minorText}>Place your order</div>
                        <div className={classes.subMinorText}>Pick from unique home menus you can’t find anywhere else</div>
                    </Grid>
                    <Grid item xs={4}>
                        <img src={pixeltrue_special_deals} width="80%" alt="Healthy living"/>
                        <div className={classes.minorText}>Get your food</div>
                        <div className={classes.subMinorText}>Have it delivered to your door or pick it up yourself</div>
                    </Grid>
                </Grid>
                <Grid container spacing={1} style={{textAlign: "left"}}>
                    <Grid item xs={5}>
                        <div className={classes.headerText}>Why try Bakely?</div>
                        <div className={classes.minorText}>Explore new flavors</div>
                        <div className={classes.subMinorText}>Discover new and unique homeade food in your area</div>
                        <div className={classes.minorText}>Support local bakers</div>
                        <div className={classes.subMinorText}>Help people keep doing what they love</div>
                        <div className={classes.minorText}>Great prices</div>
                        <div className={classes.subMinorText}>No restaurant upkeep, just delicious food</div>
                    </Grid>
                    <Grid item xs={7}>
                        <img src={pixeltrue_meditation} width="80%" alt="Location" />
                    </Grid>
                </Grid>
                <Grid container spacing={1}>
                    <Grid item xs={7}>
                        <img src={pixeltrue_plan_1} width="80%" alt="plan" />
                    </Grid>
                    <Grid item xs={5} rowHeight={25}>
                        <div className={classes.headerText}>Food safety</div>
                        <div className={classes.subMinorText}>At Bakely, we’re serious about food safety. 
                            We are committed to ensuring that your food will always be safe to eat. 
                            All bakers have undergone food safety training and are compliant with the laws of their operating region. 
                        </div>
                    </Grid>
                </Grid>
                <Grid container spacing={1} style={{textAlign: "center", paddingTop: "50px"}}>
                    <Grid item xs={12}>
                        <div className={classes.minorText}>Don’t enter your area code.</div>
                        <div className={classes.subMinorText} style={{paddingBottom: "0px"}}>This is definitely not reverse psychology...</div>
                        <div className={classes.inputWithIcon}>
                            <input type="text" placeholder={"enter your address"} required/>
                            <i class="fa fa-location-arrow" ></i>
                        </div>
                    </Grid>
                </Grid>
            </Container>
            
        );
    }
}

export default HomePage;