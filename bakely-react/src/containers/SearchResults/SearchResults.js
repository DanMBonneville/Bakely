import React, { Component } from "react";
import { connect } from "react-redux";
import MenuItemPreview from "../../components/CustomerComponenets/MenuItemPreview/MenuItemPreview";
import * as actions from '../../store/actions/index';
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import GridList from "@material-ui/core/GridList";

const classes = makeStyles((theme) => ({
  gridList: {
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)",
    width: "100%",
  },
  root: {
    color: "black",
    textAlign: "left",
    fontSize: "30px",
  },
  titleBar: {
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
  },
  emptyListMessage: {
    height: "20px",
  },
}));
//const classes = classesAction();

class SearchResults extends Component {
  state = {
    seeAllFavorites: false,
    seeAllRecents: false
  }
  render() {
    const itemList = this.props.foodItems;
    // Apply sorting here maybe
    //
    let itemPreviewList = [];
    let favorites = [];
    let newlyAdded = [];
    itemList.forEach((item) => {
      console.log("This is the returned item data: ", item);
      const vendor = this.props.vendors.find(ven => {
        return item.vendorId === ven.vendorId
      });
      itemPreviewList.push(
        <MenuItemPreview
          vendor={vendor}
          setSelectedItemById={(id) => this.props.setSelectedItemById(id)}
          item={item}
          // classes={TODO: passed stylings}
        />
      );
    });
    favorites.push(itemPreviewList[0]);
    favorites.push(itemPreviewList[1]);
    newlyAdded.push(itemPreviewList[0]);
    newlyAdded.push(itemPreviewList[1]);

    //////// seperate here,
    //create the item Profile
    // create vendor profile
    // create vendor preview, link it

    return (
      <Grid container spacing={1} justify={"center"}>
        <p className={classes.title}>Local Favorites</p>
        <Grid item xs={12}>
          <GridList
            cellHeight={"auto"}
            cols={1}
            spacing={4}
            className={classes.gridList}
          >
            <Grid container justify="center">
              {favorites}
            </Grid>
          </GridList>
        </Grid>
        <p className={classes.title}>Newly Added</p>
        <Grid item xs={12}>
          <GridList
            cellHeight={"auto"}
            cols={1}
            spacing={4}
            className={classes.gridList}
          >
            <Grid container justify="center">
              {newlyAdded}
            </Grid>
          </GridList>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    searchResults: state.user.searchValue,
    userData: state.user.userData,
    foodItems: state.food.foodItems,
    vendors: state.vendor.vendors
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setSelectedItemById: (id) => dispatch(actions.setSelectedItemById(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);
