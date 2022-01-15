import mongoose from "mongoose";
const Schema = mongoose.Schema;

const CategoryClimateData = new Schema({
    January: {
        type: Schema.Types.Mixed,
        required: true
    },
    February: {
        type: Schema.Types.Mixed,
        required: true
    },
    March: {
        type: Schema.Types.Mixed,
        required: true
    },
    April: {
        type: Schema.Types.Mixed,
        required: true
    },
    May: {
        type: Schema.Types.Mixed,
        required: true
    },
    June: {
        type: Schema.Types.Mixed,
        required: true
    },
    July: {
        type: Schema.Types.Mixed,
        required: true
    },
    August: {
        type: Schema.Types.Mixed,
        required: true
    },
    September: {
        type: Schema.Types.Mixed,
        required: true
    },
    October: {
        type: Schema.Types.Mixed,
        required: true
    },
    November: {
        type: Schema.Types.Mixed,
        required: true
    },
    December: {
        type: Schema.Types.Mixed,
        required: true
    }
});

module.exports = mongoose.model("CategoryClimateData",CategoryClimateData);