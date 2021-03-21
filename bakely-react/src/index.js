import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import './index.css';
import App from './App';
<<<<<<< HEAD
import vendorReducer from './store/reducers/vendorReducer';
import authReducer from './store/reducers/authReducer';
import customerReducer from './store/reducers/customerReducer';
import checkoutReducer from './store/reducers/checkoutReducer';
=======
import rootReducer from './store/reducers';
>>>>>>> 4534a86b9c3beae44bdc7695623c05565cc311dd

// import registerServiceWorker from './registerServiceWorker';

// For redux devtolls
<<<<<<< HEAD
// const composeEnhancers = (process.env.NODE_ENV === 'development') ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;
// Then replace compose with composeEnhancers in the store const

const rootReducer = combineReducers({
    vendor: vendorReducer,
    auth: authReducer,
    cust: customerReducer,
    checkout: checkoutReducer
});

const store = createStore(rootReducer, compose(
=======
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(
>>>>>>> 4534a86b9c3beae44bdc7695623c05565cc311dd
    applyMiddleware(thunk)
));

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
//registerServiceWorker();