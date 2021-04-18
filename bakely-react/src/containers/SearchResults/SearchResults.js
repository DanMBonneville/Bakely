import React, { Component } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';

class SearchResults extends Component {

    render() {

        let foodResults =
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    Local Favorites
                </Grid>
                <Grid item xs={6}>

                </Grid>
            </Grid>;
        let vendorResults =
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    Top Home Bakeries
                </Grid>
                <Grid item xs={6}>

                </Grid>
            </Grid>;
        let recentlyAdded =
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    Recently Added
                </Grid>
                <Grid item xs={6}>

                </Grid>
            </Grid>;


        return (
            <Auxiliary>
                <div>
                    searchResults:{this.props.searchResults}
                </div>
                {foodResults}
                {vendorResults}
                {recentlyAdded}
            </Auxiliary>
        )
    }
}


const mapStateToProps = state => {
    return {
        searchResults: state.user.searchValue
    }
}

const mapDispatchToProps = dispatch => {
    return {

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);