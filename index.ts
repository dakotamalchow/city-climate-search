//@ts-nocheck
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const mongoose = require("mongoose");
const axios = require("axios");
const cheerio = require("cheerio");
const ClimateDataLoader = require("./climateDataLoader");

mongoose.connect("mongodb://127.0.0.1:27017")
    .then(() => {
        console.log("Mongo connection open");
    })
    .catch((error: Error) => {
        console.log("Error connecting to Mongo: " + error);
    });

app.get("/", async (req,res) => {
    res.set("Access-Control-Allow-Origin","*");

    const climateDataLoader = new ClimateDataLoader();
    const cityLinks = await climateDataLoader.getCityLinks();
   
    // TODO: load data for all links in the background, store somewhere?
    const climateData = await axios.get("https://en.wikipedia.org" + cityLinks[1])
        .then(({data}) => {
            const $ = cheerio.load(data);
            return climateDataLoader.extractCityData($);
        });
    res.send({message: JSON.stringify(climateData,null,2)});
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});