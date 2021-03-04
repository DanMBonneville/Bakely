import React, { Component } from 'react';

import Container from '@material-ui/core/Container';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
//import classes from './Checkout.css';

import Button from '../../components/UI/Button/Button';
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
                <Grid item xs={12} md={12} lg={12} xl={12} sm={12}>
                <Button
                    onClick={this.props.createStripeSession(this.state.user.email)}
                >Checkout</Button>
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