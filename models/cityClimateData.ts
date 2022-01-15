import { Schema } from "mongoose";

const CityClimateData = new mongoose.Schema({
    name: {
        type: String,
        requied: true
    },
    link: {
        type: String,
        required: true
    },
    climateData: {
        recordHigh: {
            type: Schema.Types.ObjectId,
            ref: "CategoryClimateData"
        },
        meanMaximum: {
            type: Schema.Types.ObjectId,
            ref: "CategoryClimateData"
        },
        averageHigh: {
            type: Schema.Types.ObjectId,
            ref: "CategoryClimateData"
        },
        dailyMean: {
            type: Schema.Types.ObjectId,
            ref: "CategoryClimateData"
        },
        averageLow: {
            type: Schema.Types.ObjectId,
            ref: "CategoryClimateData"
        },
        meanMinimum: {
            type: Schema.Types.ObjectId,
            ref: "CategoryClimateData"
        },
        recordLow: {
            type: Schema.Types.ObjectId,
            ref: "CategoryClimateData"
        },
        averageRainfall: {
            type: Schema.Types.ObjectId,
            ref: "CategoryClimateData"
        },
        averageRainyDays: {
            type: Schema.Types.ObjectId,
            ref: "CategoryClimateData"
        },
        meanMonthlySunshineHours: {
            type: Schema.Types.ObjectId,
            ref: "CategoryClimateData"
        },
        percentPossibleSunshine: {
            type: Schema.Types.ObjectId,
            ref: "CategoryClimateData"
        },
        required: true
    }
})