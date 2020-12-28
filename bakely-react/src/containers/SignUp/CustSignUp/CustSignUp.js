import React, { Component } from 'react';
import classes from "./CustSignUp.css";
import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';

class CustSignUp extends Component {

    state = {
        signUpForm: {
            fisrtName: {
                value: '',
            },
            lastName: {
                value: '',
            },
            zipCode: {
                value: '',
            },
            phoneNumber: {
                value: '',
            },
            email: {
                value: '',
            },
            password: {
                value: '',
            },
        },
        formIsValid: true
    }


    render() {

        const formElementsArray = [];

        let form = (
            <form onSubmit={this.submitHandler}>
                {formElementsArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        value={formElement.value} />
                ))}
                <Button btnType="Success" disabled={!this.state.formIsValid}>Submit</Button>
            </form>
        );

        return (
            <div className={classes.SignUpForm} >
                <h4>This is the Customer Sign up page</h4>
                {form}
            </div>
        );
    }


}


export default CustSignUp;