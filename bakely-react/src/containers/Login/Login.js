import React, { Component } from 'react';
import { connect } from 'react-redux';
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

import { signInWith } from '../../firebase';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import * as actions from '../../store/actions/index';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Container';

class Login extends Component {

    uiConfig = {
        singInFlow: "popup",
        signInOptions: [
            signInWith.EmailAuthProvider.PROVIDER_ID,
            signInWith.GoogleAuthProvider.PROVIDER_ID,
            signInWith.FacebookAuthProvider.PROVIDER_ID
        ],
        callbacks: {
            signInSuccessWithAuthResult: (user) => {
                console.log('sign in successful with response', user);
                this.props.login(user);
            }
        }
    }

    componentDidMount() {
        this.props.onAuthStateChanged();
    }

    render() {
        console.log("customedfghjr:", this.props.customer);
        let errorMessage = null;
        if (this.props.error) {
            errorMessage = (
                <p>{this.props.error.message}</p>
            );
        }
        return (
            <Auxiliary>
                <Container disableGutters maxWidth={'xs'}>
                    {errorMessage}
                    {this.props.isAuthenticated ?
                    <Grid item xs={12}>
                        <div style ={{color:"black", fontSize:"2rem", textAlign:"left"}}>Welcome back,</div>
                        <div style={{fontSize:"2rem", marginBottom:"25px", textAlign:"left"}}>{this.props.customer.firstName}</div>
                        <div style={{color:"black", fontSize: "1rem", textAlign:"left"}}>Add a card...</div>
                        
                    </Grid>
                    :<StyledFirebaseAuth 
                        uiConfig={this.uiConfig} 
                        firebaseAuth={signInWith()}
                    />}
                </Container>
            </Auxiliary>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.user !== null,
        customer: state.cust.userData
    };
};

const mapDispatchToProps = dispatch => {
    return {
        login: (user) => dispatch(actions.login(user)),
        onAuthStateChanged: () => dispatch(actions.authListener())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);