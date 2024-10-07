import express from "express";
import userController from "../../controller/userController";
const Router=express.Router();


const usercontroller=new userController();


Router.route('/product').post(usercontroller.sendMessageToken)




export default Router