import { Router } from "express";
import {getResponse} from '../controllers/prompt.controller.js'

const router = Router()

router.route("/getDetails/:promptText").get(getResponse)

export default router