import React, { Component } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import VendorMenuItem from '../../components/FoodItems/VendorMenuItem/VendorMenuItem';
import Modal from '../../components/UI/Modal/Modal';
import VendorAddEditMenuItem from '../../components/FoodItems/VendorAddEditMenuItem/VendorAddEditMenuItem';

import * as actions from '../../store/actions/index';

class VendorMenu extends Component {

    state = {
        //schedule: 
        foodItems: this.props.footItems,
        addingAnItem: false
    }

    addAnItem = (e) => {
        console.log("Hello?");
        e.preventDefault();
        this.setState({
            addingAnItem: true
        });
    }

    render() {
        let menuItems = [];
        for(let footItem in this.props.foodItems){
            menuItems.push(
                <Grid item xs={12}>
                    <VendorMenuItem {...footItem} />
                </Grid>
            );
        }
        console.log("These are the menu items: ", menuItems);
        return (
            <Grid container spacing={0}>
                <Modal show={this.state.addingAnItem}>
                    <VendorAddEditMenuItem
                        isEditing={false}
                        user={this.props.user}
                        onAddEditMenuItem={(formData) => this.props.onAddEditFoodItem(formData)}
                    />
                </Modal>
                <Grid item xs={12}>
                    <div style={{'color': 'black'}}>My Menu</div>
                </Grid>
                {menuItems}
                <Grid item xs={12}>
                    <Button 
                        onClick={this.addAnItem}
                        variant="outlined"
                        color={"secondary"}
                    >Add an item + </Button>
                </Grid>
            </Grid>
        );
    }
}

const mapStateToProps = state => {
    return {
        //schedule: state.vendor.schedule,
        footItems: state.food.foodItems,
        user: state.auth.user,
        loading: state.auth.loading,
        error: state.auth.error,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        // change to add/edit
        onAddEditFoodItem: (formData) => dispatch(actions.addEditFoodItem(formData))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(VendorMenu);