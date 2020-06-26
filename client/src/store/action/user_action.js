import axios from 'axios';
import {
    USER_LOGIN,
    USER_AUTH,
    USER_LOGOUT
} from '../type';




//***************USER***********//

export function loginUser({
    email,
    password
}) {

    const request = axios.post('/api/user/login', {
            email,
            password
        })
        .then(response => response.data)

    return {
        type: USER_LOGIN,
        payload: request
    }
}

export function auth(){
    const request = axios.get('/api/user/auth')
                    .then(response=>response.data);

          return{
                type: USER_AUTH,
                payload: request
          }          
}

export function logoutUser(){
    const request = axios.get('api/user/logout')
                    .then(response => {
                        return null
                    });

        return {
            type: USER_LOGOUT,
            payload: request
        }

}