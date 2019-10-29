import {combineReducers} from 'redux';
var {AsyncStorage} = require('react-native');

import {
  QUOTES_AVAILABLE,
  ADD_QUOTE,
  UPDATE_QUOTE,
  DELETE_QUOTE,
} from '../actions/index';

let dataState = {quotes: [], loading: true};

const dataReducer = (state = dataState, action) => {
  switch (action.type) {
    case ADD_QUOTE:
      var quotes = cloneObject(state.quotes);
      quotes.unshift(action.quote);
      state = Object.assign({}, state, {quotes: quotes});
      return state;

    case QUOTES_AVAILABLE:
      state = Object.assign({}, state, {quotes: action.quotes, loading: false});
      return state;

    case UPDATE_QUOTE:
      var quote = action.quote;
      var quotes = cloneObject(state.quotes);
      var index = getIndex(quotes, quote.id);
      if (index !== -1) {
        quotes[index]['author'] = quote.author;
        quotes[index]['quote'] = quote.quote;
      }
      state = Object.assign({}, state, {quotes: quotes});
      return state;

    case DELETE_QUOTE:
      var quotes = cloneObject(state.quotes);
      var index = getIndex(quotes, action.id);
      if (index !== -1) quotes.splice(index, 1);
      state = Object.assign({}, state, {quotes: quotes});
      return state;

    default:
      return state;
  }
};

function cloneObject(object) {
  return JSON.parse(JSON.stringify(object));
}

function getIndex(data, id) {
  let clone = JSON.parse(JSON.stringify(data));
  return clone.findIndex(obj => parseInt(obj.id) === parseInt(id));
}

const rootReducer = combineReducers({
  dataReducer,
});

export default rootReducer;
