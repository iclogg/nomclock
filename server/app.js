const express = require("express");

const petRoutes = require("./routes/pet-routes");

const HttpError = require("./models/http-error");

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/pets", petRoutes);

//Catch all middleware
app.use((req, res, next) => {
    const error = new HttpError("Page not found.", 404);
    throw error;
});

// Error handling

app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error);
    }

    res.status(error.code || 500);
    res.json({ message: error.message || "An unknow error happened." });
});

// set port and start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Serving on port ${port}`);
});
