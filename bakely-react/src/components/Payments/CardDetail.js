import React from "react";
import Grid from '@material-ui/core/Grid';

export default function CardDetail(props) {
  if (!props.cardExists) {
    return (
      <div>
        <Grid container direction="row" justify="center">
          <Grid item xs={12} md={12} lg={12} xl={12} sm={12}>
            We see you don't have a payment method! Please add one.
          </Grid>
        </Grid>
        <Grid
          container
          direction="row"
          justify="center"
          style={{ paddingTop: "10px" }}
        >
          <Grid item xs={12} md={12} lg={12} xl={12} sm={12}>
            Note, this card will be come your default and will be re-used for
            all future transactions until you enter a new default card.
          </Grid>
        </Grid>
      </div>
    );
  }
  else
  {
    return (
      <div>
        <Grid container direction="row" justify="center">
          <Grid item xs={12} md={12} lg={12} xl={12} sm={12}>
            We see you already have a card on file with us! It's a {props.brand} ending in {props.last4}.
          </Grid>
        </Grid>
        <Grid
          container
          direction="row"
          justify="center"
          style={{ paddingTop: "10px" }}
        >
          <Grid item xs={12} md={12} lg={12} xl={12} sm={12}>
          If you'd like to update your card on file, simply add a new one below! We will take care of the rest.
          </Grid>
        </Grid>
      </div>
    );
  }
}
