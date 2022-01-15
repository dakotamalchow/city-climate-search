import mongoose from "mongoose";
import axios from "axios";
import cheerio from "cheerio";
import { ClimateDataLoader } from "../climateDataLoader";
const CityClimateData = require("../models/cityClimateData");

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
    const cityLinks = await climateDataLoader.getCityLinks();

    const climateData = await axios.get("https://en.wikipedia.org" + cityLinks[1])
        .then(({data}: any) => {
            const $ = cheerio.load(data);
            return climateDataLoader.extractCityData($);
        });
    
    const cityClimateData = new CityClimateData();
    cityClimateData.name = climateData.name;
    cityClimateData.link = cityLinks[1];
    // cityClimateData.climateData.recordHigh = {

    // }
    await cityClimateData.save();
}

export { reloadData };