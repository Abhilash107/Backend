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
    },
    picture: {
        type:String,
        required: true,
    }

}, {timestamps: true})

export const Prompt = mongoose.model("Prompt", promptSchema)