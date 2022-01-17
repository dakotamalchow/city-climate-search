import mongoose from "mongoose";
const Schema = mongoose.Schema;

export type dataObject = {
    [key: string]: any
};

export class schemaTypes {
    static mixed = {
        type: Schema.Types.Mixed
    };
    
    static requiredString = {
        type: String,
        requied: true
    }
}

export const categoriesMapping: dataObject = {
    "Record high °F (°C)": "recordHigh",
    "Mean maximum °F (°C)": "meanMaximum",
    "Average high °F (°C)": "averageHigh",
    "Daily mean °F (°C)": "dailyMean",
    "Average low °F (°C)": "averageLow",
    "Mean minimum °F (°C)": "meanMinimum",
    "Record low °F (°C)": "recordLow",
    "Average rainfall inches (mm)": "averageRainfall",
    "Average precipitation inches (mm)": "averageRainfall",
    "Average snowfall inches (cm)": "averageSnowfall",
    "Average rainy days (≥ 0.01 in)": "averageRainyDays",
    "Average snowy days (≥ 0.1 in)": "averageSnowyDays",
    "Average relative humidity (%)": "averageRelativeHumidity",
    "Average dew point °F (°C)": "averageDewPoint",
    "Mean monthly sunshine hours": "meanMonthlysunshineHours",
    "Percent possible sunshine": "percentPossibleSunshine",
    "Average ultraviolet index": "averageUltravioletIndex"
}