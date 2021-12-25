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
}

module.exports = ClimateDataLoader;