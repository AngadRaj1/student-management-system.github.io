import { combineReducers } from 'redux';
import user from './user';
import register_user from './register_user';

const rootReducers = combineReducers({
    user,
    register_user
});

export default rootReducers;