const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const axios = require("axios");
const cheerio = require("cheerio");

app.get("/", async (req,res) => {
    res.set("Access-Control-Allow-Origin","*");

    const extractCityLinks = $ => {
        return $("tr:first-child a")
            .filter((_, el) => {
                return $(el).attr("title")
                && !$(el).attr("href").includes("Template")
                && !$(el).attr("href").includes("United_States");
            })
            .map((_, el) => $(el).attr("href"))
            .toArray();
    };

    const extractClimateData = $ => {
        return $("tr th")
            .filter((_, el) => $(el).text().includes("Climate"))
            .map((_, el) => $(el).text())
            .toArray();
    };

    // is currently only returning the first 100 results
    const cityLinks = await axios.get("https://en.wikipedia.org/wiki/List_of_United_States_cities_by_population")
        .then(({data}) => {
            const $ = cheerio.load(data);
            return extractCityLinks($);
        });
    
        const climateData = await axios.get("https://en.wikipedia.org" + cityLinks[1])
        .then(({data}) => {
            const $ = cheerio.load(data);
            return extractClimateData($);
        });
    res.send({message: climateData});
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});