import { NextFunction, Request, Response } from "express";

export default interface IUserController {
    loginHandler(req: Request, res: Response,next:NextFunction): Promise<void>;
    signUpHandler(req: Request, res: Response,next:NextFunction): Promise<void>;
    profileHandler(req: Request, res: Response,next:NextFunction): Promise<void>;
}