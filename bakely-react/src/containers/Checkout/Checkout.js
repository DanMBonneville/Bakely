import React, { Component } from 'react';

import Container from '@material-ui/core/Container';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import stripe_connect from "../../assets/images/stripeConnect.png";

import * as actions from '../../store/actions/index';

class Checkout extends Component {

    render () {
        return (
            <Container>
                <Grid
  container
  direction="row"
  justify="center"
>
                <Grid item xs={2} md={2} lg={2} xl={2} sm={2} >
                    <img onClick={() => this.props.createStripeSession(this.props.email, this.props.user.uid)} src={stripe_connect} width="90%" alt="Healthy living" style={{float: "center"}}></img>
                </Grid> 
                </Grid>
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
        // change this to accomidate firebase
        isAuthenticated: state.auth.user !== null,
        user: state.auth.user,
        email: state.auth.user.email
    };
};

const mapDispatchToProps = dispatch => {
    return {
        createStripeSession: (email, uid) => {
            dispatch(actions.createStripeSession(email, uid))
        }
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(Checkout);