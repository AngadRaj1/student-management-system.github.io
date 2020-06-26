// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import { createStore } from 'redux';
// import { Provider } from 'react-redux';
// import rootReducers from './store/reducers/index'

// // const rootReducer = combineReducers({
// //   form:formReducer
// // })

// const store = createStore(rootReducers);
 
// ReactDOM.render(
//   <Provider store={store}>
//     <App />
//     </Provider>,
//   document.getElementById('root')
// );


import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { Provider } from 'react-redux';
import { createStore,applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';
import { composeWithDevTools } from 'redux-devtools-extension'

import reducers from './store/reducers/index';


const createStoreMiddleware = createStore(reducers,composeWithDevTools(applyMiddleware(promiseMiddleware)));
//const createStoreMiddleware = applyMiddleware(promiseMiddleware)(createStore);




ReactDOM.render(
    <Provider store={createStoreMiddleware}>
        <App />
    </Provider>
    ,document.getElementById('root'));
