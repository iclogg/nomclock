const baseAxios = require("axios");
const axios = baseAxios.create({
    baseURL: "http://localhost:5000/api/",
    timeout: 50000,
});

//TODO check what needs to be added for security to axios instance

export async function sendRequest(url, method = "GET", body = null) {
    console.log("body:", body);

    try {
        const response = await axios[method](url, { ...body });
    } catch (error) {
        console.error(error);
    }
}
