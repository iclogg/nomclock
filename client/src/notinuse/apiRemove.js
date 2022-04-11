const baseAxios = require("axios");
const axios = baseAxios.create({
    baseURL: "http://localhost:5000/api/",
    timeout: 50000,
});

export async function sendRequest(url, method = "get", body = null, headers) {
    if (method === "get") {
        body = { params: { ...body } };
    }

    try {
        const response = await axios[method](url, { ...body }, { headers });

        return response;
    } catch (error) {
        console.error("in api.js", error);
        return error.response;
    }
}
