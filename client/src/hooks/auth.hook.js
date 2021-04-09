import React, {useState, useCallback, useEffect} from 'react';

const storageName = "userData";

export function useAuth() {
    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);
    const [userLogin, setUserLogin] = useState(null);

    const login = useCallback((jwtToken, id, userLogin) => {
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
    }, [login])

    return {login, logout, token, userId, userLogin};
}