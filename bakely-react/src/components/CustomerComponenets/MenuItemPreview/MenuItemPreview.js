import React from 'react';
import { withRouter } from 'react-router-dom';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';

const MenuItemPreview = (props) => {
    // classes
    // add this to props next 
    const {author, item, setSelectedItemId} = props;

    const itemIsPassed = null != item;
    console.log("menu item profile info: ", item)
    const name = author.firstName + ' ' + author.lastName;
    function handleClick() {
        setSelectedItemId(item.foodId);
        props.history.push('/viewMenuItemProfile'); 
    }
    if (!itemIsPassed) {
        return null;
    }
    return (
        <div onClick={handleClick}>
            <GridListTile key={item.imageUrl}>
                <img src={item.imageUrl} alt={item.foodName}
                    style={{ width: "300px", height: "100%" }} />
                <GridListTileBar
                    title={item.foodName}
                    // classes={{
                    //     root: classes.titleBar,
                    //     title: classes.title,
                    // }}
                    subtitle={name}
                    actionIcon={
                        <IconButton aria-label={`info about ${item.foodName}`} >
                            {/* TODO: place Vendor Preview here */}
                        </IconButton>
                    }
                />
            </GridListTile>
        </div>
    );
};

export default withRouter(MenuItemPreview);