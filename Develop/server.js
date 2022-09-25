const express = require("express");
const apiRoutes = require("./routes/apiRoutes");
const htmlRoutes = require("./routes/htmlRoutes");

// initialize app and port
const app = express();
const PORT = process.env.PORT || 3000;

// express middleware
app.use(express.static('public')); // link to assets
// this sets up data parsing where express will interprety it as json required for api calls
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api", apiRoutes);
app.use("/", htmlRoutes);


// Start server on port
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));