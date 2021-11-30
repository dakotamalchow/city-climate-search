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

        const rows = $("tr")
            .filter((_, el) => $(el).text().includes("Climate data for"))
            .parent().first().children();
        const months = rows.next().first()
            .children("th").next().text().split("\n").filter(month => month);

        let categoryTableData = rows.next().next();
        const categoryCount = categoryTableData.length - 1;
        for (let i=0; i<categoryCount; i ++) {
            const categoryName = categoryTableData.first().children("th").text().trim();
            const categoryRowData = categoryTableData.children("td").text().split("\n").filter(data => data);
            climateData[categoryName] = {};
            for (let j=0; j<months.length; j++) {
                climateData[categoryName][months[j]] = categoryRowData[j];
            }
            // returns the next and following elements
            categoryTableData = categoryTableData.next();
        }

        return climateData;
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
    res.send({message: JSON.stringify(climateData)});
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});