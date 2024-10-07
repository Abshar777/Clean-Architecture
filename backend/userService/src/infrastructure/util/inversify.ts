import { Container } from "inversify";
import IUserRepository from "../interfaces/IUserRepository";
import INTERFACE_TYPES from "../contants/inversify";
import UserRepository from "../../database/repositories/userRepository";
import { IUSerIntractor } from "../interfaces/IUserIntractor";
import { UserIntractor } from "../../intractors/userIntractor";
import { UserController } from "../../controllers/userController";
import IUserController from "../interfaces/IUserController";
import IJwt from "../interfaces/IJwt";
import Jwt from "./jwt";

const container=new Container();

container.bind<IUserRepository>(INTERFACE_TYPES.UserRepository).to(UserRepository);
container.bind<IUSerIntractor>(INTERFACE_TYPES.UserIntractor).to(UserIntractor)
container.bind<IUserController>(INTERFACE_TYPES.UserController).to(UserController)
container.bind<IJwt>(INTERFACE_TYPES.jwt).to(Jwt)

export default container
