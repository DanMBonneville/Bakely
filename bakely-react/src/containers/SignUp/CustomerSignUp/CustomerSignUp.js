import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import classes from "./CustomerSignUp.css";

import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';
import Spinner from '../../../components/UI/Spinner/Spinner';

import * as actions from '../../../store/actions/index';
import { updateObject, checkValidity } from '../../../shared/utility';

class CustomerSignUp extends Component {

    state = {
        role: 'customer',
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
                valid: false
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
                valid: false
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
                valid: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false
            }
        },
        formIsValid: true
    }

    componentDidMount() {
        if (this.props.authRedirectPath !== '/') {
            this.props.onSetAuthRedirectPath();
        }
    }

    submitHandler = (event) => {
        event.preventDefault();
        const formData = {};
        for (let formElementIdentifier in this.state.signUpForm) {
            formData[formElementIdentifier] = this.state.signUpForm[formElementIdentifier].value;
        }
        const newCustomer = {
            role: this.state.role,
            data: formData
        }
        this.props.onCustomerSignUp(newCustomer);
    }

    // abstract this form?
    // update and validate the form as things are typed
    inputChangedHandler = (event, inputIdentifier) => {
        //check validity in this object
        const updatedFormElement = updateObject(this.state.signUpForm[inputIdentifier], {
            value: event.target.value,
            valid: checkValidity(event.target.value, this.state.signUpForm[inputIdentifier].validation),
            touched: true
        });
        const updatedForm = updateObject(this.state.signUpForm, {
            [inputIdentifier]: updatedFormElement
        });

        let formIsValid = true;
        for (let inputIdentifier in updatedForm) {
            formIsValid = updatedForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({ signUpForm: updatedForm });
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
            <form onSubmit={this.submitHandler} className={classes.SignUpForm}>
                {formElementsArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                ))}
                <Button btnType="Success" >Submit</Button>
            </form>
        );
        if (this.props.loading) {
            form = <Spinner />
        }
        let errorMessage = null;
        if (this.props.error) {
            errorMessage = (
                <p>{this.props.error.message}</p>
            );
        }
        let authRedirect = null;
        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authRedirectPath} />
        }           
        return (
            <div>
                <h4>Sign Up, or continue as guest</h4>
                {authRedirect}
                {errorMessage} 
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.user !== null,
        authRedirectPath: state.auth.authRedirectPath
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onCustomerSignUp: (newCustomer) => dispatch(actions.signUp(newCustomer)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerSignUp);
