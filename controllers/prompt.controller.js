import { response } from 'express'
import {Prompt} from '../models/prompt.model.js'
import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { asyncHandler } from '../utils/asyncHandler.js'

const getResponse = asyncHandler( async (req, res)=>{
    const { promptText } = req.params

    if(!promptText){
        throw new ApiError(400, "Invalid Prompt")
    }

    const prompt = await Prompt.findOne({
        //  $regex: new RegExp(promptText, 'i') to handle the regex issue
        promptText: { $regex: new RegExp(promptText, 'i')}
    })

    if(!prompt){
        return res
        .status(404)
        .json(
            new ApiResponse(404, "Prompt not found")
        )
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, {responseText: prompt.responseText})
        )
})

export { getResponse }