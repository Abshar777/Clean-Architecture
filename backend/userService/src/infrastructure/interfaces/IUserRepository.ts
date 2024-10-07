import { UpdateQuery } from "mongoose";
import IUser from "./IUser";

export default interface IUserRepository{
    create(data:IUser):Promise<IUser>;
    update(userId:string,data:UpdateQuery<IUser>):Promise<IUser | null>;
    delete(userId:string):Promise<void>;
    findById(_id:string):Promise<IUser | null>;
    findByEmail(email:string):Promise<IUser | null>;
    find(limit:number):Promise<IUser[] | []>

}