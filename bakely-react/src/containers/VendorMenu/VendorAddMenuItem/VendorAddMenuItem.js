import React, { Component } from 'react';
import connect from 'redux';
import * as classes from './VendorAddMenuItem.css';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';
import {updateObject} from '../../../shared/utility';


class VendorAddMenuItem extends Component {
    state = {
        menuItem: {
            image: null,
            description: null,
            title: null,
            price: null
        },
        addItemForm: {
            image: {
                image: null,
                valid: false,
            },
            title: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'What would you like to call it?',
                },
                label: 'Item name:',
                value: '',
                valid: false,
                touched: false
            },
            description: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Give people a description of this item.'
                },
                label: 'Description:',
                value: '',
                valid: false,
                touched: false
            },
        },
        formIsValid: false
    };

    inputPicture = e => {
        if (e.target.files[0]) {
            this.setState({
                menuItem:{
                    ...this.state.menuItem,
                    image: e.target.files[0]
                }
            });
        }
    };

    addNewMenuItem = (event) => {
        event.preventDefault();
  
        let formData = {};
        formData['image'] = this.state.addItemForm.image;
        formData['title'] = this.state.addItemForm.title.value;
        formData['description'] = this.state.addItemForm.description.value;
        formData['price'] = this.state.addItemForm.price;

        this.props.onAddMenuItem(formData);
    }

    // change check validity file
    validateInput = (event, inputIdentifier) => {
        const updatedFormElement = updateObject(this.state.addItemForm[inputIdentifier], {
            value: event.target.value,
            valid: checkValidity(event.target.value, this.state.addItemForm[inputIdentifier].validation),
            touched: true
        });
        const updatedForm = updateObject(this.state.addItemForm, {
            [inputIdentifier]: updatedFormElement
        });
        
        let formIsValid = true;
        for (let inputIdentifier in updatedForm) {
            formIsValid = updatedForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({addItemForm: updatedForm, formIsValid: formIsValid});

    };

    render() {

        const formElementsArray = [];
        for(let key in this.state.addItemForm){
            formElementsArray.push({
                id: key,
                config: this.state.addItemForm[key]
            });
        }

        return (
            <Auxiliary>
                <div className={classes.addMenuHeader}>Add Item to Menu</div>
                <form onSubmit={this.addNewMenuItem}>
                    <input type="file" onChange={this.inputPicture} />
                    {formElementsArray.map(formElement => (
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        label={formElement.config.label}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        touched={formElement.config.touched}
                        changed={(event) => this.validateInput(event, formElement.id)} />
                    ))}
                    {/* currancy input */}
                    <Button btnType="Success" disabled={!this.state.formIsValid}>Add Item</Button>
                </form>
            </Auxiliary>
        );
    }
};

const mapStateToProps = state => {
    return {
        
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAddMenuItem: (formData) => dispatch(actions.addMenuItem(formData))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(VendorAddMenuItem);

// next step: add further stuff with upload flow https://www.youtube.com/watch?v=8r1Pb6Ja90o&t=753s&ab_channel=HongLy