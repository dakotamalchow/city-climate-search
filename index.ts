//@ts-nocheck
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const axios = require("axios");
const cheerio = require("cheerio");
const ClimateDataLoader = require("./climateDataLoader");

app.get("/", async (req,res) => {
    res.set("Access-Control-Allow-Origin","*");

    const climateDataLoader = new ClimateDataLoader();
    const cityLinks = await climateDataLoader.getCityLinks();
    
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