import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from "./ShefSignUp.css";

import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';
import errorHandler from '../../../hoc/errorHandler/errorHandler';

import * as actions from '../../../store/actions/index';
import { updateObject } from '../../../shared/utility';
import axios from '../../../axios-instance';

class ShefSignUp extends Component {

    state = {
        signUpForm: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: ''
            },
            fisrtName: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your First Name'
                },
                value: ''
            },
            lastName: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Last Name'
                },
                value: ''
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP code'
                },
                value: ''
            },
            phoneNumber: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Phone Number'
                },
                value: ''
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: ''
            }
        },
        formIsValid: true
    }

    // Create object, place existing state in, dispatch
    submitHandler = ( event ) => {
        event.preventDefault();
        const formData = {};
        for (let formElementIdentifier in this.state.signUpForm) {
            formData[formElementIdentifier] = this.state.signUpForm[formElementIdentifier].value;
        }
        const newShef = {
            shefData: formData
        }
        this.props.onShefSignUp(newShef);
    }

    // update and validate the form as things are typed
    inputChangedHandler = (event, inputIdentifier) => {
        //check validity in this object
        const updatedFormElement = updateObject(this.state.signUpForm[inputIdentifier], {
            value: event.target.value
            // valid: checkValidity(event.target.value, this.state.orderForm[inputIdentifier].validation),
            // touched: true
        });
        const updatedShefForm = updateObject(this.state.signUpForm, {
            [inputIdentifier]: updatedFormElement
        });

        // let formIsValid = true;
        // for (let inputIdentifier in updatedOrderForm) {
        //    formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        // }
        this.setState({ signUpForm: updatedShefForm }); 
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.signUpForm) {
            formElementsArray.push({
                id: key,
                config: this.state.signUpForm[key]
            });
        }
        let form = (
            <form onSubmit={this.submitHandler}>
                {formElementsArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value} 
                        changed = {(event) => this.inputChangedHandler(event, formElement.id)} />
                ))}
                <Button btnType="Success" >Submit</Button>
            </form>
        );

        return (
            <div className={classes.signUpForm} >
                <h4>Become a Professional Shef!</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {

    };
}

const mapDispatchToProps = dispatch => {
    return {
        onShefSignUp: (newShef) => dispatch(actions.shefSignUp(newShef))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(errorHandler(ShefSignUp, axios));

// error handler needs to be dealt with