const baseAxios = require("axios");
const axios = baseAxios.create({
    baseURL: "http://localhost:5000/api/",
    timeout: 1000,
});

//TODO check what needs to be added for security to axios instance

export async function createUser(data) {
    try {
        const response = await axios.post("/user", data);
        console.log(response);
    } catch (error) {
        console.error(error);
    }
}
