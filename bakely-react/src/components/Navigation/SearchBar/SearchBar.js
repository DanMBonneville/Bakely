import React, { useState } from 'react';
import SearchBar from "material-ui-search-bar";
import * as classes from './SearchBar.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';

const searchBar = (props) => {

    const [value, setValue] = useState('');

    let attachedClasses = [classes.SearchBar, classes.Close];
    if (props.open) {
        attachedClasses = [classes.SearchBar, classes.Open];
    }

    return (
        <Auxiliary>
            <Backdrop 
                show={props.open} 
                clicked={props.closed} 
            />
            <SearchBar
                className={attachedClasses.join(' ')}
                value={value}
                onChange={(newValue) => setValue( newValue )}
                onRequestSearch={() => props.search(value)}
            />
        </Auxiliary>
    );
}

export default searchBar;