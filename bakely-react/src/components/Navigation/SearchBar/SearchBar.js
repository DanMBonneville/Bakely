import React, { useState } from 'react';
import {withRouter} from 'react-router-dom';
import SearchBar from "material-ui-search-bar";
import * as classes from './SearchBar.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';

const searchBar = (props) => {

    const [currentValue, setCurrentValue] = useState('');

    function search(query) {
        props.setSearchValue(query);
        props.history.push('/searchResults');
        props.closed();
        setCurrentValue('');
    }

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
                style={{
                    'height': '56px'
                }}
                value={currentValue}
                onChange={(newValue) => setCurrentValue( newValue )}
                onRequestSearch={() => search(currentValue)}
            />
        </Auxiliary>
    );
}

export default withRouter(searchBar);