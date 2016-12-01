import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { Router, Route, browserHistory } from 'react-router';

// components
import App from './components/app';

// redux store
import store from './store';

require('../public/style/main.scss');

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path='/*' component={App} />
        </Router>
    </Provider>
    , document.querySelector('#root'));
