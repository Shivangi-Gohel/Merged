import { Router } from "express";
import { addPost, findUser, loginUser, logoutUser, registerUser } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/register").post(registerUser)
router.post("/login",loginUser)
router.post("/logout", verifyJWT, logoutUser)
router.post("/posts", verifyJWT, addPost)

export default router