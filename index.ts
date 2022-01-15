//@ts-nocheck
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const mongoose = require("mongoose");
import { reloadData } from "./utils/initData";
const CityClimateData = require("./models/cityClimateData");

mongoose.connect("mongodb://127.0.0.1:27017")
    .then(() => {
        console.log("Mongo connection open");
    })
    .catch((error: Error) => {
        console.log("Error connecting to Mongo: " + error);
    });

app.get("/", async (req,res) => {
    res.set("Access-Control-Allow-Origin","*");
    await reloadData();
    res.send({message: JSON.stringify(await CityClimateData.find(),"",2)});
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});