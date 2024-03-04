const express = require("express");
const db = require('./config/mongoose');
const path = require('path')
require('dotenv').config()
const app = express();
const PORT = 8001;

app.use(express.json());

app.use("/", require("./routes"));


app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));
