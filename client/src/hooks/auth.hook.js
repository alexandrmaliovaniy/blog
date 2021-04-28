import React, {useState, useCallback, useEffect} from 'react';
import {useHttp} from './http.hook';

const storageName = "userData";

export function useAuth() {
    const {request} = useHttp();
    const [ready, setReady] = useState(false);
    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);
    const [userLogin, setUserLogin] = useState(null);

    const login = useCallback(async(jwtToken, id, userLogin) => {
        try {
            await request('/api/auth/validate', 'POST', null, {
                Authorization: `Bearer ${jwtToken}`
            })
        } catch(e) {
            return logout();
        }
        setToken(jwtToken);
        setUserId(id);
        setUserLogin(userLogin);
        localStorage.setItem(storageName, JSON.stringify({token: jwtToken, userId: id, userLogin: userLogin}))
    }, [])
    const logout = useCallback(() => {
        setToken(null);
        setUserId(null);
        setUserLogin(null);
        localStorage.removeItem(storageName)
    }, [])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName));
        if (data && data.token) {
            login(data.token, data.userId, data.userLogin);
        }
        setReady(true);
    }, [login])

    return {login, logout, token, userId, userLogin, ready};
}