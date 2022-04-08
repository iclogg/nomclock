import { useState, useCallback, useEffect } from "react";
let logoutTimer;

export const useAuth = () => {
    const [authLoading, setAuthLoading] = useState(true);
    const [token, setToken] = useState(false);
    const [tokenExpirationDate, setTokenExpirationDate] = useState();
    const [userId, setUserId] = useState(false);

    const login = useCallback((userId, token, expirationDate) => {
        setToken(token);
        setUserId(userId);
        const updatedTokenExpirationDate =
            expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
        setTokenExpirationDate(updatedTokenExpirationDate);
        localStorage.setItem(
            "userData",
            JSON.stringify({
                userId,
                token,
                expiration: updatedTokenExpirationDate.toISOString(),
            })
        );
        console.log("login");
    }, []);

    const logout = useCallback(() => {
        setToken(null);
        setUserId(null);
        setTokenExpirationDate(null);
        localStorage.removeItem("userData");
        console.log("logout");
    }, []);

    useEffect(() => {
        if (token && tokenExpirationDate) {
            const remainingTime =
                tokenExpirationDate.getTime() - new Date().getTime();
            logoutTimer = setTimeout(logout, remainingTime);
        } else {
            clearTimeout(logoutTimer);
        }
    }, [token, logout, tokenExpirationDate]);

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem("userData"));
        if (
            storedData &&
            storedData.token &&
            new Date(storedData.expiration) > new Date()
        ) {
            login(
                storedData.userId,
                storedData.token,
                new Date(storedData.expiration)
            );
        }
        //To avoid redirecting when waiting for auth
        setAuthLoading(false);
    }, [login]);

    return { token, userId, login, logout, authLoading };
};
