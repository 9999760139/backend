require("./config/dbConnection")
const express = require("express");
const errorHandler = require("./middleware/ErrorHandler");

const dotenv = require("dotenv").config();


const app = express();

const port = process.env.PORT || 5002;

app.use(express.json());
app.use("/api/allcontact", require("./routes/contactRoutes"));
app.use("/api/user", require("./routes/userRoutes"));

app.use(errorHandler)











app.listen(port, () => {
    console.log(`express server running on ${port}`)
})