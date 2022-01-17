import mongoose from "mongoose";
import axios from "axios";
import cheerio from "cheerio";
import { ClimateDataLoader } from "../climateDataLoader";
const CityClimateData = require("../models/cityClimateData");
import { dataObject } from "../constants";

const reloadData = async () => {
    mongoose.connect("mongodb://127.0.0.1:27017")
        .then(() => {
            console.log("Mongo connection open");
        })
        .catch((error: Error) => {
            console.log("Error connecting to Mongo: " + error);
        });
    
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
        console.log();
    }
}

const getClimateData = (extractedClimateData: dataObject): dataObject => {
    let climateData: dataObject = {};
    const categoriesMapping: dataObject = {
        "Record high °F (°C)": "recordHigh",
        "Mean maximum °F (°C)": "meanMaximum"
    }
    
    for (const extractedProperty in extractedClimateData) {
        const property = categoriesMapping[extractedProperty];
        if (property) {
            climateData[property] = getCategoryData(extractedClimateData[extractedProperty]);
        }
    }

    return climateData;
}

const getCategoryData = (extractedClimateDataCategory: dataObject): dataObject => {
    let categoryData: dataObject = {};

    return categoryData;
}

export { reloadData };