//@ts-nocheck
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const axios = require("axios");
const cheerio = require("cheerio");
const ClimateDataLoader = require("./climateDataLoader");

app.get("/", async (req,res) => {
    res.set("Access-Control-Allow-Origin","*");

    /*
    const climateData = {
        "Record high": {
            "Jan": 95,
            "Feb": 95,
            ...
        },
        "Mean maximum": {
            "Jan": 83.0,
            "Feb": 82.8,
            ...
        },
        ...
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

    const climateDataLoader = new ClimateDataLoader();
    const cityLinks = await climateDataLoader.getCityLinks();
    
    const climateData = await axios.get("https://en.wikipedia.org" + cityLinks[1])
    .then(({data}) => {
        const $ = cheerio.load(data);
        return extractClimateData($);
    });
    res.send({message: JSON.stringify(climateData,null,2)});
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});