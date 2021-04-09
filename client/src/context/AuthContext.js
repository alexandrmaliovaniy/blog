import {createContext} from 'react';

export const AuthContext = createContext({
    token: null,
    userId: null,
    userLogin: null,
    login: () => {},
    logout: () => {},
    isAuth: false
})