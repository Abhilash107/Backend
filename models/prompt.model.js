import mongoose from "mongoose";

const promptSchema = new mongoose.Schema({
    promptText:{
        type: String,
        unique: true,
        index: true,
    },
    responseText:{
        type: String,
        unique: true,
        index: true,
    }

}, {timestamps: true})

export const Prompt = mongoose.model("Prompt", promptSchema)