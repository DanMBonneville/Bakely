import React, { Component } from 'react';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import classes from './HomePage.css';

class Checkout extends Component {

    render () {
        return (
            <Container>
                <Button
                    onClick={this.props.createStripeSession(this.state.user.email)}
                ></Button>
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
            dispatch(action.createStripeSession(email))
        }
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(Checkout);