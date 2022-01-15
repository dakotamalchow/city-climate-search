const cityClimateData = new mongoose.Schema({
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

        },
        meanMaximum: {

        },
        averageHigh: {

        },
        dailyMean: {

        },
        averageLow: {

        },
        meanMinimum: {

        },
        recordLow: {

        },
        averageRainfall: {

        },
        averageRainyDays: {

        },
        meanMonthlySunshineHours: {

        },
        percentPossibleSunshine: {

        },
        required: true
    }
})