import { Grid } from '@material-ui/core';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class MenuItemProfile extends Component {

    render() {
        const item = this.props.foodItem;
        return (
            <Grid container justify="space-between" spacing={1} style={{textAlign: "center"}}>
                    <Grid item xs={12} md={7} lg={7} xl={7} sm={7}>
                        <img src={item.imageUrl} width="100%" alt="Selected Food Item"/>
                    </Grid>
                    <Grid item xs={12} md={7} lg={7} xl={7} sm={7}>
                        <div>Name: {item.foodName}</div>
                        <div>Description: {item.description}</div>
                    </Grid>
                    <Grid item xs={12} md={7} lg={7} xl={7} sm={7}>
                        <div>This is the current info from the slected Item: </div>
                        <div>vendorId, price, description, foodName, imageUrl, foodId</div>
                    </Grid>
                    <Grid item xs={12} md={7} lg={7} xl={7} sm={7}>
                        <div></div>
                        <div></div>
                    </Grid>
                    <Grid item xs={12} md={7} lg={7} xl={7} sm={7}>
                        <div></div>
                        <div>ADD TO CART GOES HERE</div>
                    </Grid>
            </Grid>
        );
    }
}

const mapStateToProps = state => {
    return {
        foodItem: state.food.selectedFoodItem
    };
};

const mapDispatchToProps = dispatch => {
    return {
        
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuItemProfile);