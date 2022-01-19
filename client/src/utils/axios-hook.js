import { useCallback, useState, useEffect } from "react";

const baseAxios = require("axios");
const axios = baseAxios.create({
    baseURL: "http://localhost:5000/api/",
    timeout: 50000,
});

//TODO check what needs to be added for security to axios instance

//TODO add error handling

export const useAxios = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const activeHttpRequests = useRef([]);

    const sendRequest = useCallback(
        async (url, method = "get", body = null, headers = {}) => {
            if (method === "get") {
                body = { params: { ...body } };
            }
            setIsLoading(true);
            const axiosAbortCtrl = new AbortController();
            activeHttpRequests.current.push(axiosAbortCtrl);

            try {
                const response = await axios[method](
                    url,
                    { ...body, signal: axiosAbortCtrl },
                    { headers }
                );
                /* TODO check if I need to check response.ok and manually throw an error */

                if (response.statusText !== "OK") {
                    throw new Error(response.data.message);
                }
                setIsLoading(false);

                return response;
            } catch (error) {
                console.error("in api.js", error);
                setIsLoading(false);

                return error.response.data;
            }
        },
        []
    );

    const clearError = () => {
        setError("");
    };

    useEffect(() => {
        return () => {
            activeHttpRequests.current.forEach((abortCtrl) =>
                abortCtrl.abort()
            );
        };
    }, []);

    return { sendRequest, clearError, isLoading, error };
};
