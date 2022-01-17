import mongoose from "mongoose";
const Schema = mongoose.Schema;

export type dataObject = {
    [key: string]: any
};

export class schemaTypes {
    static requiredMixed = {
        type: Schema.Types.Mixed,
        required: true
    };
    
    static requiredString = {
        type: String,
        requied: true
    }
}