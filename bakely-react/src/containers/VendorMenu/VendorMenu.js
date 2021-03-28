import React, { Component } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import GridList from '@material-ui/core/GridList';

import VendorMenuItem from '../../components/FoodItems/VendorMenuItem/VendorMenuItem';
import Modal from '../../components/UI/Modal/Modal';
import VendorAddEditMenuItem from '../../components/FoodItems/VendorAddEditMenuItem/VendorAddEditMenuItem';

import * as actions from '../../store/actions/index';

const classes = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
    //   backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      flexWrap: 'nowrap',
      // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
      transform: 'translateZ(0)',
    },
    title: {
      color: theme.secondary,
    },
    titleBar: {
      background:
        'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
  })
);

class VendorMenu extends Component {

    state = {
        //schedule: 
        foodItems: this.props.footItems,
        addingEditingAnItem: false
    }

    addAnItem = (e) => {
        e.preventDefault();
        this.setState({
            addingEditingAnItem: true
        });
    }

    closeModal = () => {
        this.setState({
            addingEditingAnItem: false
        });
    }

    handleAddEditMenuItem = (formData) => {
        this.props.onAddEditFoodItem(formData);
        this.closeModal();
    }

    render() {
        const itemList = [];
        const author = this.props.userData.firstName + " " + this.props.userData.lastName;
        this.props.foodItems.forEach( item => {
            if (this.props.userId === item.userId) {
                itemList.push(<VendorMenuItem
                    key={item.foodId}
                    item={item}
                    classes={classes}
                    author={author}
                />)
            } 
        });
        return (
            <Grid 
                container 
                spacing={2}
                justify={"center"}
                alignContent={"center"}
                >
                <Modal show={this.state.addingEditingAnItem} modalClosed={this.closeModal}>
                    <VendorAddEditMenuItem
                        isEditing={false}
                        userId={this.props.userId}
                        onAddEditMenuItem={(formData) => this.handleAddEditMenuItem(formData)}
                    />
                </Modal>
                <Grid item xs={12}>
                    <div style={{ 
                        'color': 'black',
                        'textAlign': 'center'
                    }}>My Menu</div>
                </Grid>
                {/* className={classes.gridList} */}
                <GridList cellHeight={260}>
                    {itemList.length > 0 ? itemList: null}
                </GridList>
                <Grid item xs={6}>
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
        foodItems: state.food.foodItems,
        userData: state.user.userData,
        userId: state.auth.user.uid,
        loading: state.auth.loading,
        error: state.auth.error,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onAddEditFoodItem: (formData) => dispatch(actions.addEditFoodItem(formData))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(VendorMenu);