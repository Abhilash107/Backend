import { Router } from "express";
import { upload }from '../middlewares/multer.middleware.js'
import { loginUser, logoutUser, registerUser } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";




const router = Router();
console.log("Received a request");


router.route('/register').post( 
    upload.fields(
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

router.route("/login").post(loginUser)

//secured routes
router.route("logout").post(verifyJWT, logoutUser)

export default router;





//In backend development, routes refer to the endpoints or URLs that your application listens for and responds to. These routes define the entry points for clients to interact with your backend services.





