import React, { Component } from 'react';
import { connect } from 'react-redux';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';

class MenuItemProfile extends Component {


    render() {
        
        return (
            <Auxiliary>
                    This is the Menu item profile
            </Auxiliary>
        );
    }
}

const mapStateToProps = state => {
    return {
        
    };
};

const mapDispatchToProps = dispatch => {
    return {
        
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuItemProfile);