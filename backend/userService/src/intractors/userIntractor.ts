import { inject, injectable } from "inversify";
import IUser from "../infrastructure/interfaces/IUser";
import { IUSerIntractor } from "../infrastructure/interfaces/IUserIntractor";
import IUserRepository from "../infrastructure/interfaces/IUserRepository";
import bcrypt from "bcryptjs"
import INTERFACE_TYPES from "../infrastructure/contants/inversify";

@injectable()
export class UserIntractor implements IUSerIntractor{
    private repository:IUserRepository;

    constructor(@inject(INTERFACE_TYPES.UserRepository) repository:IUserRepository){
        this.repository = repository;
    }

    async findUserByEmail(input: string) {
        return await this.repository.findByEmail(input)
    }
    async findUserById(input: string) {
        return await this.repository.findById(input)
    }
    async createUser(data: IUser) {
        return await this.repository.create(data)
    }
    async updateUser(userId: string, updateData: Partial<IUser>) {
        return await this.repository.update(userId,updateData)
    }
    async deleteUser(userId: string) {
        return await this.repository.delete(userId)
    }
    comparePassword(password: string, hashPassword: string) {
        return  bcrypt.compareSync(password,hashPassword)
    }
    
 
    
}