import express from "express";
import container from "../util/inversify";
import INTERFACE_TYPES from "../contants/inversify";
import IUserController from "../interfaces/IUserController";
const router=express.Router();

const userController=container.get<IUserController>(INTERFACE_TYPES.UserController)

// login route
router.post('/login',userController.loginHandler.bind(userController));

// sign-up route
router.post('/sign-up',userController.signUpHandler.bind(userController));

// get profile
router.get('/profile',userController.profileHandler.bind(userController));



export default router