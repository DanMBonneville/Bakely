import React, { Component,  } from 'react';

import Container from '@material-ui/core/Container';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import AddNewCard from '../../components/Payments/AddNewCard';

import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Payments extends Component {
    componentDidMount () {
        if(!this.props.paymentsloadingComplete)
        {
            this.props.onCreateNewSetupIntent(this.props.user.uid);
        }
    }
    render() {
        if(this.props.paymentsloadingComplete)
        {
            return (        
                <Container>
                    <Grid container direction="row" justify="center">
                        <Grid item xs={12} md={12} lg={12} xl={12} sm={12} >
                            We see you don't have a payment method! Please add one. 
                        </Grid>
                    </Grid>
                    <Grid container direction="row" justify="center" style={{paddingTop: "10px"}}>
                        <Grid item xs={12} md={12} lg={12} xl={12} sm={12} >
                        Note, this card will be come your default and will be re-used for all future transactions until you select a new default card.
                        </Grid>
                    </Grid>
                    <Grid container direction="row" style={{paddingTop: "10px"}}>
                            <Grid item xs={12} md={12} lg={12} xl={12} sm={12}>
                            <AddNewCard 
                            client_setup_secret={this.props.client_secret} 
                            store_payment_method={this.props.storePaymentMethod}
                            uid={this.props.user.uid}></AddNewCard>
                            </Grid>
                        </Grid>
                </Container>
            );
            
        }
        else
        {
            return (
                <Spinner />
            );
        }
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.user !== null,
        user: state.auth.user,
        paymentsloadingComplete: state.payments.paymentsloadingComplete,
        client_secret: state.payments.client_secret
    };
    
};

const mapDispatchToProps = dispatch => {
    return {
        onCreateNewSetupIntent: (uid) => {
            dispatch(actions.createNewSetupIntent(uid));
        },
        storePaymentMethod: (payment_method_doc) => {
            dispatch(actions.storePaymentMethod(payment_method_doc));
        }
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(Payments);