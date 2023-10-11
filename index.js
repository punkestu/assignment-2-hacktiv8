const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());
const http = require("./src")();
app.use(http);

app.listen(PORT, ()=>console.log(`Listening at port :${PORT}`))