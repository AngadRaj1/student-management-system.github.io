import {
 USER_REGISTER,
 CLEAR_USER
} from '../type';

export default function (state = {}, action) {
    switch (action.type) {

        case USER_REGISTER:
            return  {...state,userData: action.payload }

        case CLEAR_USER:
            return { ...state,userData: action.payload ,single:action.payload , update:action.payload}

        default:
            return state;
    }
}