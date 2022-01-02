const baseAxios = require("axios");
const axios = baseAxios.create({
    baseURL: "http://localhost:5000/api/",
    timeout: 50000,
});

//TODO check what needs to be added for security to axios instance

export async function createUser(data) {
    console.log("data:", data);

    try {
        const response = await axios.post("/users", { ...data });
    } catch (error) {
        console.error(error);
    }
}
