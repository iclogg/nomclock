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

            let response;
            try {
                if (method === "get") {
                    body = { params: { ...body } };
                    response = await axios[method](url, {
                        ...body,
                        headers,
                        signal: axiosAbortCtrl.signal,
                    });
                } else {
                    response = await axios[method](
                        url,
                        { ...body },
                        { headers }
                    );
                }

                activeHttpRequests.current = activeHttpRequests.current.filter(
                    (abortCtrl) => abortCtrl !== axiosAbortCtrl
                );
                console.log("response", response);

                /* if (
                    response.statusText !== "OK" ||
                    response.statusText !== "Created"
                ) {
                    throw new Error(response.data.message);
                } */

                setIsLoading(false);
                console.log("response in axioshook ", response, "url", url);

                return response;
            } catch (error) {
                console.error("in axios-hook.js", error);
                setError(error.message);
                setIsLoading(false);
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
