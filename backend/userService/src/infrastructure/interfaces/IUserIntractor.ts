import IUser from "./IUser";

export interface IUSerIntractor{
    findUserById(input: string): Promise<IUser | null>;
    findUserByEmail(input: string): Promise<IUser | null>;
    createUser(data:IUser): Promise<IUser>;
    updateUser(userId:string,updateData:Partial<IUser>): Promise<IUser | null>;
    deleteUser(userId:string): Promise<void>;
    comparePassword(password:string,hashPassword:string):boolean
}