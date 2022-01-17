import mongoose from "mongoose";
const Schema = mongoose.Schema;
import { schemaTypes } from "../constants";

const categoryData = {
    Jan: schemaTypes.requiredMixed,
    Feb: schemaTypes.requiredMixed,
    Mar: schemaTypes.requiredMixed,
    Apr: schemaTypes.requiredMixed,
    May: schemaTypes.requiredMixed,
    Jun: schemaTypes.requiredMixed,
    Jul: schemaTypes.requiredMixed,
    Aug: schemaTypes.requiredMixed,
    Sep: schemaTypes.requiredMixed,
    Oct: schemaTypes.requiredMixed,
    Nov: schemaTypes.requiredMixed,
    Dec: schemaTypes.requiredMixed,
    Year: schemaTypes.requiredMixed,
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