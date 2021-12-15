const express = require("express");

const petRoutes = require("./routes/pet-routes");

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/pets", petRoutes);

// Error handling
app.use((err, req, res, next) => {
    console.log("in error handler");

    if (res.headerSent) {
        return next(err);
    }

    res.status(err.code || 500);
    res.json({ message: err.message || "An unknow error happened." });
});

// set port and start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Serving on port ${port}`);
});
