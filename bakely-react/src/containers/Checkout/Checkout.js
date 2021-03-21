import React, { Component } from 'react';

import Container from '@material-ui/core/Container';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import classes from './Checkout.css';

import * as actions from '../../store/actions/index';

class Checkout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: { email: 'lrappette@consult-cts.com' }
        };
    }

    render () {
        return (
            <Container>
                <Grid
  container
  direction="row"
  justify="center"
>
                <Grid item xs={2} md={2} lg={2} xl={2} sm={2} >
                <button
                    className={classes.block}
                    onClick={() => this.props.createStripeSession(this.state.user.email)}
                >Checkout</button>
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
        user: state.auth.user
    };
};

const mapDispatchToProps = dispatch => {
    return {
        createStripeSession: (email) => {
            dispatch(actions.createStripeSession(email))
        }
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(Checkout);