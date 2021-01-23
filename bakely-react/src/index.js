import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import './index.css';
import App from './App';
import vendorReducer from './store/reducers/vendorReducer';
import authReducer from './store/reducers/authReducer';
import custReducer from './store/reducers/custReducer';

// import registerServiceWorker from './registerServiceWorker';

// For redux devtolls
// const composeEnhancers = (process.env.NODE_ENV === 'development') ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;
// Then replace compose with composeEnhancers in the store const

const rootReducer = combineReducers({
    vendor: vendorReducer,
    auth: authReducer,
    cust: custReducer
});

const store = createStore(rootReducer, compose(
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
