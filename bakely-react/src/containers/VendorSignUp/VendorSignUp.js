import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import classes from "./VendorSignUp.css";

import * as actions from "../../store/actions";

class VendorSignUp extends Component {

    state = {
        doRedirect: false,
        signUpForm: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP code'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            phoneNumber: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Phone Number'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            }
        },
        formIsValid: true
    }

    submitHandler = ( event ) => {
        event.preventDefault();
        if(this.props.userData.role === "customer"){
            this.props.setUserRole(this.props.user,"vendor");
        } else {
            this.props.setUserRole(this.props.user,"customer");
        }
        this.setState({doRedirect: true});
    }

    render() {
        let authRedirect = null;
        if (this.state.doRedirect) {
            authRedirect = <Redirect to={"/"} />
        }     
        return (
            <div className={classes.signUpForm} >
                {authRedirect}
                <button onClick={this.submitHandler}>Toggle Role of :{this.props.userData.role} </button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.user ? true : false,
        user: state.auth.user,
        userData: state.user.userData
    };
}

const mapDispatchToProps = dispatch => {
    return {
        setUserRole: (user, role) => dispatch(actions.setUserRole(user, role))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(VendorSignUp);