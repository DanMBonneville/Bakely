import React from 'react';

import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';

const menuItem = (props) => {
    const itemIsPassed = null != props.item;

    if(!itemIsPassed){
        return null;
    }

    return (
        <GridListTile key={props.item.imageUrl}>
            <img src={props.item.imageUrl} alt={props.item.foodName}
                style={{ width: "300px", height: "100%" }} />
            <GridListTileBar
                title={props.item.foodName}
                classes={{
                    root: props.classes.titleBar,
                    title: props.classes.title,
                }}
                subtitle={<span>by: {props.author}</span>}
                actionIcon={
                    <IconButton aria-label={`info about ${props.item.foodName}`} >
                        <InfoIcon className={props.classes.title} />
                    </IconButton>
                }
            />
        </GridListTile>
    );
};

export default menuItem;