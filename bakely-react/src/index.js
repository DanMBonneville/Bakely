import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import './index.css';
import App from './App';
import rootReducer from './store/reducers';

// import registerServiceWorker from './registerServiceWorker';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));

const theme = createMuiTheme({
    palette: {
        primary: {
            main:'#FA6400'
        },
        secondary: {
            main:'#2C2C2C'
        }
    }
})

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <App />
            </ThemeProvider>
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
//registerServiceWorker();