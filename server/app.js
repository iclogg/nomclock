const express = require("express");

const app = express();

app.use(express.json());

app.post("/test");
app.get("/test");

// set port and start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Serving on port ${port}`);
});
