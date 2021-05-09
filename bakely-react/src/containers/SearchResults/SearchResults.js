import React, { Component } from "react";
import { connect } from "react-redux";
import MenuItemPreview from "../../components/CustomerComponenets/MenuItemPreview/MenuItemPreview";
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
  render() {
    const itemList = this.props.foodItems;
    // Apply sorting here
    //
    // let favorites = sortByUserFavorites;
    // let newlyAdded = sortBy;
    let itemPreviewList = [];
    itemList.forEach((item) => {
      console.log("This is the returned item data: ", item);
      itemPreviewList.push(
        <MenuItemPreview
          author={this.props.userData}
          item={item}
          // classes={TODO: passed stylings}
        />
      );
    });

    return (
      <Grid container spacing={1} justify={"center"}>
        <Grid item xs={12}>
          <p className={classes.title}>Local Favorites</p>
        </Grid>
        <Grid item xs={12}>
          <GridList
            cellHeight={"auto"}
            cols={1}
            spacing={4}
            className={classes.gridList}
          >
            <Grid container justify="center">
              {itemPreviewList}
            </Grid>
          </GridList>
        </Grid>
        <Grid item xs={12}>
          <p className={classes.title}>Newly Added</p>
        </Grid>
        <Grid item xs={12}>
          <GridList
            cellHeight={"auto"}
            cols={1}
            spacing={4}
            className={classes.gridList}
          >
            <Grid container justify="center">
              {itemPreviewList}
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);
