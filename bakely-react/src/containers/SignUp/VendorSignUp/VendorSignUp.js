import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import classes from "./VendorSignUp.css";

import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';
import Spinner from '../../../components/UI/Spinner/Spinner';

import * as actions from '../../../store/actions/index';
import { updateObject, checkValidity } from '../../../shared/utility';

class VendorSignUp extends Component {

    state = {
        role: 'vendor',
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
            fisrtName: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your First Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            lastName: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Last Name'
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
                valid: false,
                touched: false
            }
        },
        formIsValid: true
    }

    componentDidMount() {
        if (this.props.authRedirectPath !== '/') {
            this.props.onSetAuthRedirectPath();
        }
    }

    submitHandler = ( event ) => {
        event.preventDefault();
        const formData = {};
        for (let formElementIdentifier in this.state.signUpForm) {
            formData[formElementIdentifier] = this.state.signUpForm[formElementIdentifier].value;
        }
        const newVendor = {
            role: this.state.role,
            data: formData
        }
        this.props.onVendorSignUp(newVendor);
    }

    inputChangedHandler = (event, inputIdentifier) => {
        // Create new object and verify per key stroke
        const updatedFormElement = updateObject(this.state.signUpForm[inputIdentifier], {
            value: event.target.value,
            valid: checkValidity(event.target.value, this.state.signUpForm[inputIdentifier].validation),
            touched: true
        });
        // Attach new object to old form
        const updatedVendorForm = updateObject(this.state.signUpForm, {
            [inputIdentifier]: updatedFormElement
        });
        let formIsValid = true;
        // update forms validity based on singular action
        for (let inputIdentifier in updatedVendorForm) {
            formIsValid = updatedVendorForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({ signUpForm: updatedVendorForm }); 
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
            <form onSubmit={this.submitHandler} className={ classes.SignUpForm }>
                {formElementsArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value} 
                        changed = {(event) => this.inputChangedHandler(event, formElement.id)} />
                ))}
                <Button btnType="Success" disabled={this.state.formIsValid}>Submit</Button>
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
            <div className={classes.signUpForm} >
                <h4>Become a Professional</h4>
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
        onVendorSignUp: (newVendor) => dispatch(actions.signUp(newVendor)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(VendorSignUp);