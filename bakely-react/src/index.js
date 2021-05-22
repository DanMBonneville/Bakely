import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import './index.css';
import App from './App';
import rootReducer from './store/reducers';

// import registerServiceWorker from './registerServiceWorker';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = createStore(persistedReducer, composeEnhancers(
    applyMiddleware(thunk)
));
let persistor = persistStore(store);

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#FA6400'
        },
        secondary: {
            main: '#2C2C2C'
        }
    }
})

const app = (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter>
                <ThemeProvider theme={theme}>
                    <App />
                </ThemeProvider>
            </BrowserRouter>
        </PersistGate>
    </Provider>
);

// TODO: Vendors have just been added to the store, so now we need to get all the vendors ion the search result page, 
// and match by ID so that the vendors pic can be displayed and the individual vendors information can be passed onto the profile

ReactDOM.render(app, document.getElementById('root'));
//registerServiceWorker();