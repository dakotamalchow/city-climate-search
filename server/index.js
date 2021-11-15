const express = require("express");

// react uses port 3000
const PORT = process.env.PORT || 3001;

const app = express();

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

app.get("/", (req,res) => {
    res.send("Hello, world");
})