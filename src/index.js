import React from 'react';
import ReactDOM from 'react-dom';

import * as serviceWorker from './serviceWorker';
import App from './App';

// const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

// const rootReducer = combineReducers({
//     auth: authReducer
// });

// const myStore = createStore(rootReducer, composeEnhancers());

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
