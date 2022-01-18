const baseAxios = require("axios");
const axios = baseAxios.create({
    baseURL: "http://localhost:5000/api/",
    timeout: 50000,
});

//TODO check what needs to be added for security to axios instance

//TODO add error handling

export async function sendRequest(url, method = "get", body = null, headers) {
    if (method === "get") {
        body = { params: { ...body } };
    }

    try {
        const response = await axios[method](url, { ...body }, { headers });
        /* TODO check if I need to check response.ok and manually throw an error */

        return response;
    } catch (error) {
        console.error("in api.js", error);
        return error.response;
    }
}
