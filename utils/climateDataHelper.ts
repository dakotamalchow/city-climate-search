export const getCategoryName = (extractedCategoryName: string): string => {
    switch (extractedCategoryName) {
        case "Record high °F (°C)":
            return "recordHigh";
        case "Mean maximum °F (°C)":
            return "meanMaximum";
        case "Average high °F (°C)":
            return "averageHigh";
        case "Daily mean °F (°C)":
            return "dailyMean";
        case "Average low °F (°C)":
            return "averageLow";
        case "Mean minimum °F (°C)":
            return "meanMinimum";
        case "Record low °F (°C)":
            return "recordLow";
        case "Average rainfall inches (mm)":
        case "Average precipitation inches (mm)":
            return "averageRainfall";
        case "Average snowfall inches (cm)":
            return "averageSnowfall";
        case "Average rainy days (≥ 0.01 in)":
        case "Average precipitation days (≥ 0.01 in)":
            return "averageRainyDays";
        case "Average snowy days (≥ 0.1 in)":
            return "averageSnowyDays";
        case "Average relative humidity (%)":
            return "averageRelativeHumidity";
        case "Average dew point °F (°C)":
            return "averageDewPoint";
        case "Mean monthly sunshine hours":
            return "meanMonthlysunshineHours";
        case "Percent possible sunshine":
            return "percentPossibleSunshine";
        case "Average ultraviolet index":
            return "averageUltravioletIndex";
        default:
            return "";
    }
}