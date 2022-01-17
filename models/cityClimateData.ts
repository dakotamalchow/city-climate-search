import mongoose from "mongoose";
const Schema = mongoose.Schema;
import { schemaTypes } from "../constants";

const categoryData = {
    Jan: schemaTypes.mixed,
    Feb: schemaTypes.mixed,
    Mar: schemaTypes.mixed,
    Apr: schemaTypes.mixed,
    May: schemaTypes.mixed,
    Jun: schemaTypes.mixed,
    Jul: schemaTypes.mixed,
    Aug: schemaTypes.mixed,
    Sep: schemaTypes.mixed,
    Oct: schemaTypes.mixed,
    Nov: schemaTypes.mixed,
    Dec: schemaTypes.mixed,
    Year: schemaTypes.mixed
};

const CityClimateData = new Schema({
    name: schemaTypes.requiredString,
    link: schemaTypes.requiredString,
    climateData: {
        recordHigh: categoryData,
        meanMaximum: categoryData,
        averageHigh: categoryData,
        dailyMean: categoryData,        
        averageLow: categoryData,
        meanMinimum: categoryData,
        recordLow: categoryData,
        averageRainfall: categoryData,
        averageRainyDays: categoryData,
        meanMonthlySunshineHours: categoryData,
        percentPossibleSunshine: categoryData
    }
});

module.exports = mongoose.model("CityClimateData",CityClimateData);