import axios from "axios";
import cheerio from "cheerio";
import { ClimateDataLoader } from "../climateDataLoader";
const CityClimateData = require("../models/cityClimateData");
import { dataObject } from "../constants";
import { getCategoryName } from "./climateDataHelper";

const reloadData = async () => {    
    await CityClimateData.deleteMany();

    const climateDataLoader = new ClimateDataLoader();
    const cityLinks = (await climateDataLoader.getCityLinks()).splice(0,5);

    for (const cityLink of cityLinks) {
        const extractedCityData = await axios.get("https://en.wikipedia.org" + cityLink)
            .then(({data}: any) => {
                const $ = cheerio.load(data);
                return climateDataLoader.extractCityData($);
            });
        
        const cityClimateData = new CityClimateData();
        cityClimateData.name = extractedCityData.name;
        cityClimateData.link = cityLink;
        
        cityClimateData.climateData = getClimateData(extractedCityData);

        await cityClimateData.save();
        console.log(`Finished uploading ${cityClimateData.name}`);
    }
}

const getClimateData = (extractedClimateData: dataObject): dataObject => {
    let climateData: dataObject = {};
    
    for (const extractedProperty in extractedClimateData) {
        const categoryName = getCategoryName(extractedProperty);
        if (categoryName) {
            climateData[categoryName] = getCategoryData(extractedClimateData[extractedProperty],categoryName);
        }
    }

    return climateData;
}

const getCategoryData = (extractedCategory: dataObject, categoryName: string): dataObject => {
    let categoryData: dataObject = {};
    const tempCategories = ["recordHigh","meanMaximum","averageHigh","dailyMean","averageLow","meanMinimum","recordLow","averageDewPoint"];

    for (const month in extractedCategory) {
        // before formatting, data will look like: "27.7(−2.4)"
        const dataArray = extractedCategory[month].replace(/−/g,"-").slice(0,-1).split("(");
        if (tempCategories.includes(categoryName)) {
            categoryData[month] = {
                F: parseFloat(dataArray[0]),
                C: parseFloat(dataArray[1])
            };
        } else if (categoryName === "averageRainfall") {
            categoryData[month] = {
                in: parseFloat(dataArray[0]),
                mm: parseFloat(dataArray[1])
            };
        } else if (categoryName === "averageSnowfall") {
            categoryData[month] = {
                in: parseFloat(dataArray[0]),
                cm: parseFloat(dataArray[1])
            };
        } else {
            categoryData[month] = parseFloat(extractedCategory[month]);
        }
    }

    return categoryData;
}

export { reloadData };