import { useCallback, useState, useEffect, useRef } from "react";

const baseAxios = require("axios");
const axios = baseAxios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,
    timeout: 50000,
});

//TODO check what needs to be added for security to axios instance

//TODO add error handling

const useAxios = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    const activeHttpRequests = useRef([]);

    const sendRequest = useCallback(
        async (url, method = "get", body = null, headers = {}) => {
            setIsLoading(true);
            const axiosAbortCtrl = new AbortController();
            activeHttpRequests.current.push(axiosAbortCtrl);
            console.log("url:", url, "method:", method, "body:", body);

            let response;
            try {
                if (method === "get" || method === "delete") {
                    response = await axios[method](url, {
                        params: { ...body },
                        headers,
                        signal: axiosAbortCtrl.signal,
                    });
                } else {
                    /* TODO Add signal to this request */
                    response = await axios[method](
                        url,
                        { ...body },
                        { headers }
                    );
                }

                activeHttpRequests.current = activeHttpRequests.current.filter(
                    (abortCtrl) => abortCtrl !== axiosAbortCtrl
                );

                /* TODO see if replacement for below isgit diff  needed */
                /* if (
                    response.statusText !== "OK" ||
                    response.statusText !== "Created"
                ) {
                    throw new Error(response.data.message);
                } */

                setIsLoading(false);

                return response;
            } catch (error) {
                console.error("in axios-hook.js", error);
                setIsLoading(false);
                setError(error.response.data.message);
                throw error;
            }
        },
        []
    );

    const clearError = () => {
        setError("");
    };

    const clearIsLoading = () => {
        setIsLoading("");
    };

    useEffect(() => {
        return () => {
            activeHttpRequests.current.forEach((abortCtrl) => {
                abortCtrl.abort();
            });
        };
    }, []);

    return { sendRequest, clearError, clearIsLoading, isLoading, error };
};

export default useAxios;
