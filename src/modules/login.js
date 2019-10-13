import axios from 'axios';
import { api_url } from '../constants/server_config';
import { FETCHING, SUCCESS, ERROR } from '../constants/actions'

export const LOGIN_REQUEST = 'login/LOGIN_REQUEST';
export const LOGIN_RESET = 'login/LOGIN_RESET';


let user_cred;
const { user } = localStorage
if (user) {
    user_cred = JSON.parse(user);
}

const initialState = {
    isLoggedIn: !!user_cred,
    isLoggingIn: false,
    user: {
        token: user_cred ? user_cred.token : undefined,
        userId: user_cred ? user_cred.userId : undefined
    }
}

export default (state = initialState, action) => {
    switch(action.type) {
        case LOGIN_REQUEST + FETCHING: 
            return {
                ...state,
                isLoggingIn: true
            }
        case LOGIN_REQUEST + SUCCESS:
            return {
                ...state,
                isLoggingIn: false,
                isLoggedIn: true,
                user: {
                    ...action.payload
                }
            }
        case LOGIN_REQUEST + ERROR:
            return {
                ...state,
                isLoggedIn: false,
                isLoggingIn: false
            }
        case LOGIN_RESET:
            return { ...initialState }
        default:
        return state;
    }
}

export const actionLoginRequest = ({email, password, history }) => async dispatch => {
   try {
        dispatch({
            type: LOGIN_REQUEST + FETCHING
        })

        const { data } = await axios({
            method: 'POST',
            url: `${api_url}/Users/login`,
            data: {
                email,
                password
            }
        })
        
        
        dispatch({
            type: LOGIN_REQUEST + SUCCESS,
            payload: {
                token: data.id,
                userId: data.userId
            }
        })

        localStorage.setItem("user", JSON.stringify({
            token: data.id,
            userId: data.userId
        }))

        history.push('/')
   } catch (e) {
       console.log(e)
       dispatch({ type: LOGIN_REQUEST + ERROR})
   }
}
  
export const actionLogOut = ({ history }) => dispatch => {
    dispatch({ type: LOGIN_RESET })
    localStorage.removeItem("user")
}