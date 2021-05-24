import React, { useState, useEffect } from 'react';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import { Container } from '@material-ui/core';

import { checkValidity } from '../../../shared/utility';
import * as classes from './VendorAddEditMenuItem.css';


const vendorAddEditMenuItem = (props) => {

    const [foodId, setFoodId] = useState(null);
    const [image, setImage] = useState("");
    const [imagePreview, setImagePreview] = useState("");
    const [foodName, setfoodName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");

    const [imageIsValid, setImageIsValid] = useState(props.isEditing);
    const [foodNameIsValid, setfoodNameIsValid] = useState(props.isEditing);
    const [descriptionIsValid, setDescriptionIsValid] = useState(props.isEditing);
    // true for now
    const [priceIsValid, setPriceIsValid] = useState(true);
    const [formIsValid, setFormIsValid] = useState(false);

    useEffect(()=>{
        const item = props.currentItem;
        if(item){
            setFoodId(item.foodId);
            setImagePreview(item.imageUrl);
            setfoodName(item.foodName);
            setDescription(item.description);
            setPrice(item.price);
            setImageIsValid(true);
            setfoodNameIsValid(true);
            setDescriptionIsValid(true);
            setFormIsValid(true);
        } else {
            setFoodId(null);
            setImagePreview("");
            setfoodName("");
            setDescription("");
            setPrice("");
            setFormIsValid("");
            setImageIsValid(false);
            setfoodNameIsValid(false);
            setDescriptionIsValid(false);
            setFormIsValid(false);
        }
    },[props.currentItem])

    const validateInput = (event, inputIdentifier) => {
        let rules = null;
        const value = inputIdentifier === "image" ? event.target.files[0] : event.target.value
        if(!value) return;
        if (inputIdentifier === "image") {
            rules = { imageType: "image" };
            setImagePreview(URL.createObjectURL(value));
            setImage(value);
            setImageIsValid(checkValidity(value, rules));
        }
        else if (inputIdentifier === "foodName") {
            rules = { maxLength: "40" };
            setfoodName(value);
            setfoodNameIsValid(checkValidity(value, rules));
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
        setFormIsValid(imageIsValid && foodNameIsValid && descriptionIsValid && priceIsValid);
    };
    const saveMenuItem = (event) => {
        event.preventDefault();
        let formData = {
            'foodId': foodId,
            'vendorId': props.userId,
            'foodName': foodName,
            'description': description,
            'price': price,
            'image': image
        };
        props.onAddEditMenuItem(formData);
    }
    const deleteMenuItem = (event) => {
        event.preventDefault();
        props.onDeleteMenuItem(foodId);
    }

    return (
        <Container>
            { props.isEditing ? <div className={classes.addMenuHeader}>Edit Item</div>
                : <div className={classes.addMenuHeader}>Add Item to Menu</div>}
            <form onSubmit={this.addNewMenuItem}>
                {imagePreview ? <img src={imagePreview} alt={"upload not showing"}
                    style={{
                        'width': '80%'
                    }} /> : null}
                <input type="file" defaultValue={props.image} onChange={(e) => validateInput(e, "image")} />
                <TextField
                    helperText="Name"
                    defaultValue={foodName}
                    fullWidth={true}
                    rows={1}
                    multiline
                    variant="outlined"
                    margin={'normal'}
                    onChange={(e) => validateInput(e, "foodName")}>
                </TextField>
                <TextField
                    helperText="Description"
                    defaultValue={description}
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
                    onClick={(e) => saveMenuItem(e)}
                >Save Menu Item</Button>
                {props.isEditing ? <Button
                    classeName={classes.button}
                    startIcon={<DeleteIcon />}
                    onClick={(e) => deleteMenuItem(e)}     
                >Remove Item</Button>: null}
            </form>
        </Container>
    );
};

export default vendorAddEditMenuItem;