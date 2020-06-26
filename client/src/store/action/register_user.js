import axios from 'axios';
import {
    USER_REGISTER,
    CLEAR_USER
} from '../type';




//***************USER***********//

export function registerUser(user) {

    const request = axios.post('/api/user/signup',user)
        .then(response => response.data)

    return {
        type: USER_REGISTER,
        payload: request
    }
}

export function clearUser(user) {
    return{
        type: CLEAR_USER,
        payload:null
    }
}
