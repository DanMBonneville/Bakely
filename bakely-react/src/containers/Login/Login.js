import React, { Component } from 'react';
import { connect } from 'react-redux';
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

import { auth } from '../../firebase';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import * as actions from '../../store/actions/index';

import Grid from '@material-ui/core/Container';

class Login extends Component {

    uiConfig = {
        singInFlow: "popup",
        signInOptions: [
            auth.EmailAuthProvider.PROVIDER_ID,
            auth.GoogleAuthProvider.PROVIDER_ID,
            auth.FacebookAuthProvider.PROVIDER_ID
        ],
        callbacks: {
            signInSuccessWithAuthResult: (user) => {
                this.props.login(user);
            }
        }
    }

    render() {
        let errorMessage = null;
        if (this.props.error) {
            errorMessage = (
                <p>{this.props.error.message}</p>
            );
        }
        return (
            <Auxiliary>
                    {errorMessage}
                    {this.props.isAuthenticated && this.props.customer ?
                    <Grid xs={12}>
                        <div style ={{color:"black", fontSize:"2rem", textAlign:"left"}}>Welcome back,</div>
                        <div style={{fontSize:"2rem", marginBottom:"25px", textAlign:"left"}}>{this.props.customer.firstName}</div>
                    </Grid>:
                    <StyledFirebaseAuth 
                        uiConfig={this.uiConfig} 
                        firebaseAuth={auth()}
                    />}
            </Auxiliary>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.user ? true : false,
        customer: state.user.userData
    };
};

const mapDispatchToProps = dispatch => {
    return {
        login: (user) => dispatch(actions.login(user))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);