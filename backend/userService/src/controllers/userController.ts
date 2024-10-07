import { NextFunction, Request, Response } from "express";
import { IUSerIntractor } from "../infrastructure/interfaces/IUserIntractor";
import { inject, injectable } from "inversify";
import INTERFACE_TYPES from "../infrastructure/contants/inversify";
import IUserController from "../infrastructure/interfaces/IUserController";
import IJwt from "../infrastructure/interfaces/IJwt";
import { COOKIE_MAXAGE } from "../infrastructure/contants/timeAndDuration";


@injectable()
export class UserController implements IUserController {
  private intractor: IUSerIntractor;
  private jwt :IJwt;
  constructor(
    @inject(INTERFACE_TYPES.UserIntractor) intractor: IUSerIntractor,
    @inject(INTERFACE_TYPES.jwt) jwt:IJwt
  ) {
    this.intractor = intractor;
    this.jwt=jwt;
  }

  async loginHandler(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const user = await this.intractor.findUserByEmail(email);
      if (!user) {
        res.status(400);
        throw new Error("User not found");
      }
      const comparePassword = this.intractor.comparePassword(
        password,
        user.password
      );
      if (!comparePassword) {
        res.status(400);
        throw new Error("Invalid password");
      }
      const token=this.jwt.generateToken(user._id as string);
      res.cookie('jwt',token,{
        httpOnly:true,
        maxAge:COOKIE_MAXAGE,
        path:'/'
      })
      res.status(200).json({ message: "succefully logined", data: user });
    } catch (error) {
      next(error);
    }
  }

  async signUpHandler(req: Request, res: Response, next: NextFunction) {
    try {
      const userExist = await this.intractor.findUserByEmail(req.body.email);
      if (userExist) {
        res.status(400);
        throw new Error("User already exist");
      }
      const data = await this.intractor.createUser(req.body);
      const token=this.jwt.generateToken(data._id as string);
      res.cookie('jwt',token,{
        httpOnly:true,
        maxAge:COOKIE_MAXAGE,
        path:'/'
      })
      res.status(200).json({ message: "succefully register user", data });
    } catch (error) {
      next(error);
    }
  }

  async profileHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
        const token=req.cookies.jwt;
        if(!token) {
          res.status(400);
          throw new Error("user note login")
        }
        const {id} = await this.jwt.verifyToken(token);
        if(!id) {
          res.status(400);
          throw new Error("user note login")
        }
        const user=await this.intractor.findUserById(id);
        res.status(200).json({message:"succefully get user",data:user})
      } catch (error) {
        next(error)
      }
  }
}
