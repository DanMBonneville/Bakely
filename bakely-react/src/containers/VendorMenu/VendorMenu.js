import React, { Component } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import GridList from '@material-ui/core/GridList';

import VendorMenuItem from '../../components/VendorComponenets/VendorMenuItem/VendorMenuItem';
import Modal from '../../components/UI/Modal/Modal';
import VendorAddEditMenuItem from '../../components/VendorComponenets/VendorAddEditMenuItem/VendorAddEditMenuItem';

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
        width: '100%'
    },
    title: {
        color: theme.secondary,
    },
    titleBar: {
        background:
            'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
    emptyListMessage: {
        'height': '20px'
    }
}));

class VendorMenu extends Component {

    state = {
        //schedule: 
        foodItems: this.props.footItems,
        addingEditingAnItem: false,
        isEditing: false,
        currentItem: null
    }

    addEditAnItem = (item, editingOrAdding) => {
        this.setState({
            addingEditingAnItem: true,
            isEditing: editingOrAdding === "editing",
            currentItem: item
        });
    }

    closeModal = () => {
        this.setState({
            addingEditingAnItem: false,
            currentItem: null
        });
    }
    handleAddEditMenuItem = (formData) => {
        this.props.onAddEditFoodItem(formData);
        this.closeModal();
    }
    handleDeleteMenuItem = (foodId) => {
        this.props.onDeleteFoodItem(foodId);
        this.closeModal();
    }
    render() {
        const itemList = [];
        const author = this.props.userData.firstName + " " + this.props.userData.lastName;
        this.props.foodItems.forEach(item => {
            if (this.props.userId === item.userId) {
                itemList.push(<VendorMenuItem
                    key={item.foodId}
                    item={item}
                    classes={classes}
                    author={author}
                    onClick={() => { this.addEditAnItem(item, "editing") }}
                />)
            }
        });
        return (
            <Grid
                container
                spacing={1}
                justify={"center"}
                alignContent={"center"}
            >
                <Modal show={this.state.addingEditingAnItem} modalClosed={this.closeModal}>
                    <VendorAddEditMenuItem
                        currentItem={this.state.currentItem}
                        isEditing={this.state.isEditing}
                        userId={this.props.userId}
                        onAddEditMenuItem={(formData) => this.handleAddEditMenuItem(formData)}
                        onDeleteMenuItem={(foodId) => this.handleDeleteMenuItem(foodId)}
                    />
                </Modal>
                <Grid item xs={12}>
                    <div style={{
                        'color': 'black',
                        'textAlign': 'center'
                    }}>My Menu</div>
                </Grid>
                <Grid item xs={12}>
                    <GridList cellHeight={'auto'} cols={1} spacing={4} className={classes.gridList}>
                        <Grid container justify="center">
                            {itemList.length > 0 ? itemList : <div className={classes.emptyListMessage}>Show us what you got!</div>}
                        </Grid>
                    </GridList>
                </Grid>
                <Grid item xs={12}>
                    <Grid container justify="center">
                        <Button
                            onClick={() => this.addEditAnItem(null, "adding")}
                            variant="outlined"
                            color={"secondary"}
                        >Add an item +</Button>
                    </Grid>
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
        onAddEditFoodItem: (formData) => dispatch(actions.addEditFoodItem(formData)),
        onDeleteFoodItem: (foodId) => dispatch(actions.deleteFoodItem(foodId))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(VendorMenu);