import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  client_secret: null,
  paymentsloadingComplete: false,
  cardExists: false,
  last4: null,
  brand: null,
  expirationYear: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PAYMENTS_INIT:
      return initCardInformation(state, action);
    case actionTypes.GET_CLIENT_SETUP_SECRET:
      return updateClientSetupSecret(state, action);
    case actionTypes.PAYMENTS_LOADING_COMPLETE:
      return loadingComplete(state, action);
    default:
      return state;
  }
};

const initCardInformation = (state, action) => {
  if (action.cardExists) {
    return updateObject(state, {
      cardExists: true,
      last4: action.last4,
      brand: action.brand,
      expirationYear: action.expirationYear
    });
  }
  else {
    return updateObject(state, {
        cardExists: false,
      });
  }
};

const updateClientSetupSecret = (state, action) => {
  return updateObject(state, {
    client_secret: action.client_setup_secret,
  });
};

const loadingComplete = (state, action) => {
  return updateObject(state, {
    paymentsloadingComplete: true,
  });
};

export default reducer;
