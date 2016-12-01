import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

// import the root reducer
import rootReducer from './reducers/index';

// creating store
const store = createStore(rootReducer, composeWithDevTools());
export default store;
