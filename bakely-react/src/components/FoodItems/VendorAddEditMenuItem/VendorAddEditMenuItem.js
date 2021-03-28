import React, { useState } from 'react';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import { Container } from '@material-ui/core';

import { checkValidity } from '../../../shared/utility';
import * as classes from './VendorAddEditMenuItem.css';


const vendorAddEditMenuItem = (props) => {

    const [image, setImage] = useState("");
    const [imagePreview, setImagePreview] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");

    const [imageIsValid, setImageIsValid] = useState(props.isEditing);
    const [nameIsValid, setNameIsValid] = useState(props.isEditing);
    const [descriptionIsValid, setDescriptionIsValid] = useState(props.isEditing);
    // true for now
    const [priceIsValid, setPriceIsValid] = useState(true);
    const [formIsValid, setFormIsValid] = useState(false);

    const validateInput = (event, inputIdentifier) => {
        const value = inputIdentifier === "image" ? event.target.files[0] : event.target.value
        let rules = null;
        if (inputIdentifier === "image") {
            rules = { imageType: "image" };
            setImagePreview(URL.createObjectURL(value));
            setImage(value);
            setImageIsValid(checkValidity(value, rules));
        }
        else if (inputIdentifier === "name") {
            rules = { maxLength: "40" };
            setName(value);
            setNameIsValid(checkValidity(value, rules));
        }
        else if (inputIdentifier === "description") {
            rules = { maxLength: "160" };
            setDescription(value);
            setDescriptionIsValid(checkValidity(value, rules));
        }
        else if (inputIdentifier === "price") {
            rules = {
                // setRules later
            }
            setPrice(value);
            setPriceIsValid(checkValidity(value, rules));
        }
        setFormIsValid(imageIsValid && nameIsValid && descriptionIsValid && priceIsValid);
    };
    const addNewMenuItem = (event) => {
        event.preventDefault();
        let formData = {
            'foodName': name,
            'description': description,
            'price': price,
            'image': image,
            'userId': props.userId
        };
        // add this to props as well
        props.onAddEditMenuItem(formData);
        // set item is added or closed modal in the props
    }
    return (
        <Container>
            { props.isEditing ? <div className={classes.addMenuHeader}>Edit Item</div>
                : <div className={classes.addMenuHeader}>Add Item to Menu</div>}
            <form onSubmit={this.addNewMenuItem}>
                {/* https://www.youtube.com/watch?v=8r1Pb6Ja90o&t=753s&ab_channel=HongLy */}
                {imagePreview ? <img src={imagePreview} alt={"upload not showing"}
                    style={{
                        'width': '80%'
                    }} /> : null}
                <input type="file" onChange={(e) => validateInput(e, "image")} />
                <TextField
                    label="Name"
                    fullWidth={true}
                    rows={1}
                    multiline
                    variant="outlined"
                    margin={'normal'}
                    onChange={(e) => validateInput(e, "name")}>
                </TextField>
                <TextField
                    label="Description"
                    fullWidth={true}
                    rows={4}
                    multiline
                    variant="outlined"
                    margin={'normal'}
                    onChange={(e) => validateInput(e, "description")}>
                </TextField>
                {/* currancy input */}
                <Button
                    disabled={!formIsValid}
                    className={classes.button}
                    startIcon={<SaveIcon />}
                    fullWidth={true}
                    onClick={(e) => addNewMenuItem(e)}
                >Add Item</Button>
            </form>
        </Container>
    );
};

export default vendorAddEditMenuItem;