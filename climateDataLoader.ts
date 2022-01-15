import axios, { AxiosResponse } from "axios";
const cheerio = require("cheerio");

class ClimateDataLoader {
    constructor() {
        
    }

    getCityLinks = async () => {
        const cityListUrl = "https://en.wikipedia.org/wiki/List_of_United_States_cities_by_population";

        const response: AxiosResponse = await axios.get(cityListUrl);
        const $ = cheerio.load(response.data);
        const cityLinks = this.extractCityLinks($);

        return cityLinks;
    }

    //@ts-ignore
    extractCityLinks = $ => {
        return $("table:contains('rank') tr td:nth-child(2) a")
            //@ts-ignore
            .filter((_, el) => {
                return $(el).attr("title")
                && !$(el).attr("href").includes("Template")
                && !$(el).attr("href").includes("United_States");
            })
            //@ts-ignore
            .map((_, el) => $(el).attr("href"))
            .toArray();
    };

    //@ts-ignore
    extractCityData = $ => {
        const cityData: {[key: string]: any} = {};
        
        cityData.name = $("h1").text();

        const rows = $("tr")
            //@ts-ignore
            .filter((_, el) => $(el).text().includes("Climate data for"))
            .parent().first().children();
        const months = rows.next().first()
            .children("th").next().text().split("\n").filter((month: string) => month);

        let categoryTableData = rows.next().next();
        const categoryCount = categoryTableData.length - 1;
        for (let i=0; i<categoryCount; i ++) {
            const categoryName = categoryTableData.first().children("th").text().trim();
            const categoryRowData = categoryTableData.children("td").text().split("\n").filter((data: string) => data);
            cityData[categoryName] = {};
            for (let j=0; j<months.length; j++) {
                cityData[categoryName][months[j]] = categoryRowData[j];
            }
            // returns the next and following elements
            categoryTableData = categoryTableData.next();
        }

        return cityData;
    };
}

module.exports = ClimateDataLoader;