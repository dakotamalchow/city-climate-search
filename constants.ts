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