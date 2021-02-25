import React from 'react';
import { withRouter } from 'react-router-dom';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';

import classes from './Logo.css';

const logo = (props) => {

    const goHome = () => {
        props.history.push('/');
    };
    return (
        <Auxiliary>
            <div className={classes.Logo} style={{height: props.height}} onClick={goHome}>
                Bakely
            </div>
        </Auxiliary>
)};

export default withRouter(logo);