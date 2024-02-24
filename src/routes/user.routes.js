import { Router } from "express";
import upload from '../middlewares/multer.middleware.js'
import { registerUser } from "../controllers/user.controller.js";
const router = Router();

router.route('/register').post( upload.fields(
    [
        {
            name: "avatar",
            maxCount:1

        },
        {
            name:"coverImage",
            maxCount:1

        }
    ]),
    registerUser)


export default router;





//In backend development, routes refer to the endpoints or URLs that your application listens for and responds to. These routes define the entry points for clients to interact with your backend services.





