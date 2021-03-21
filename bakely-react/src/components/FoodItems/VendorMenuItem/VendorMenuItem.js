import React from 'react';

import Grid from '@material-ui/core/Grid';

const menuItem = (props) => {
    return (
        <Grid 
            container
            justify="center"
            alignItems="center"
        >
            <Grid item xs={10}>
                <div style={{'color':'black'}}>{props.name}</div>
            </Grid>
            <Grid item xs={10}>
                <img src={props.image} width="100%" alt={props.name}/>
            </Grid>
        </Grid>
    );
};

export default menuItem;