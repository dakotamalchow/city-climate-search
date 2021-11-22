const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

app.get("/", (req,res) => {
    res.set("Access-Control-Allow-Origin","*");
    res.send({message: "Backend is connected to React"});
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});