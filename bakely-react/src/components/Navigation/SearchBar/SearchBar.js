import React, { useState } from 'react';
import { withRouter } from 'react-router-dom'
import SearchBar from "material-ui-search-bar";
import * as classes from './SearchBar.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';

const searchBar = (props) => {
    const {setSearchValue, history, closed} = props;
    const [value, setValue] = useState('');
    function search(){
        setSearchValue(value);
        history.push('/searchResults');
        closed();
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
                value={value}
                onChange={(newValue) => setValue( newValue )}
                onRequestSearch={() => search()}
            />
        </Auxiliary>
    );
}

export default withRouter(searchBar);