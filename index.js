const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const axios = require("axios");
const cheerio = require("cheerio");

app.get("/", async (req,res) => {
    res.set("Access-Control-Allow-Origin","*");

    const extractLinks = $ => {
        return $("tr:first-child a")
            .filter((_, element) => {
                return $(element).attr("title")
                && !$(element).attr("href").includes("Template")
                && !$(element).attr("href").includes("United_States")
            })
            .map((_, element) => $(element).attr("href"))
            .toArray()
    };

    const cityLinks = await axios.get("https://en.wikipedia.org/wiki/List_of_United_States_cities_by_population")
        .then(({data}) => {
            const $ = cheerio.load(data);
            return extractLinks($);
        });
    res.send({message: cityLinks.join("\r\n")});
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});