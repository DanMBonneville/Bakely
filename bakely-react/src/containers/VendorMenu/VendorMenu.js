import React, { Component } from 'react';
import { connect } from 'react-redux';
import VendorMenuItem from '../../components/FoodItems/VendorMenuItem/VendorMenuItem';
import Button from '../../components/UI/Button/Button';

import Grid from '@material-ui/core/Grid';
import { Redirect } from 'react-router-dom';

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
        for(let footItem in this.state.foodItems){
            menuItems.push(
            <Grid item xs={12}>
                <VendorMenuItem {...footItem} />
            </Grid>);
        }
        let redirect = null;
        if(this.state.addingAnItem){
            redirect = <Redirect to={"/vendor_add_menu_item"} />
        }
        return (
            <Grid container spacing={0}>
                {redirect}
                <Grid item xs={12}>
                    <div style={{'color': 'black'}}>My Menu</div>
                </Grid>{menuItems}
                <Grid item xs={12}>
                    <Button clicked={this.addAnItem}> Add an item + </Button>
                </Grid>
            </Grid>
        );
    }
}

const mapStateToProps = state => {
    return {
        //schedule: state.vendor.schedule,
        footItems: state.user.foodItems
    };
}

const mapDispatchToProps = dispatch => {
    return {
        
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(VendorMenu);