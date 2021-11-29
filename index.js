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

    /*
    const climateData = {
        "Record high": {
            "Jan": 95,
            "Feb": 95
        }.
        "Mean maximum": {
            "Jan": 83.0,
            "Feb": 82.8
        }
    }
    */

    const extractClimateData = $ => {
        const climateData = {};
        // tr elements
        const rows = $("tr")
            //-> must include text
            .filter((_, el) => $(el).text().includes("Climate data for"))
            // -> get parent (tbody) -> get the first one -> get children (tr's)
            .parent().first().children();
        // tr elements -> skip first one (table name) -> get first one (month row)
        const months = rows.next().first()
            // -> get children (th's) -> skip first one -> get text -> split by new line -> filter if not empty string/undefined
            .children("th").next().text().split("\n").filter(month => month);
        return "blah";
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