import React, { Component,  } from 'react';

import Container from '@material-ui/core/Container';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import AddNewCard from '../../components/Payments/AddNewCard';
import CardDetail from '../../components/Payments/CardDetail';
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
                    <CardDetail
                    cardExists={this.props.cardExists}
                    brand={this.props.brand}
                    last4={this.props.last4}
                    expirationYear={this.props.expirationYear}
                    >
                    </CardDetail>
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
        client_secret: state.payments.client_secret,
        cardExists: state.payments.cardExists,
        last4: state.payments.last4,
        brand: state.payments.brand,
        expirationYear: state.payments.expirationYear
    };
    
};

const mapDispatchToProps = dispatch => {
    return {
        init: (uid) => {

        },
        onCreateNewSetupIntent: (uid) => {
            dispatch(actions.createNewSetupIntent(uid));
        },
        storePaymentMethod: (payment_method_doc) => {
            dispatch(actions.storePaymentMethod(payment_method_doc));
        }
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(Payments);