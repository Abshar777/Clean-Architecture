import { Model, UpdateQuery } from "mongoose";
import IUser from "../../infrastructure/interfaces/IUser";
import IUserRepository from "../../infrastructure/interfaces/IUserRepository";
import { userModel } from "../model/userModel";
import { injectable } from "inversify";

@injectable()
export default class UserRepository implements IUserRepository {
  private readonly db: Model<IUser>;
  constructor() {
    this.db = userModel;
  }
  async create(data: IUser) {
    return await this.db.create(data);
  }
  async update(userId: string, data: UpdateQuery<IUser>) {
    return await this.db.findOneAndUpdate({ userId }, data, { new: true });
  }
  async delete(userId: string) {
    await this.db.findOneAndDelete({ userId });
  }
  async findById(id: string) {
    return await this.db.findById(id);
  }
  async findByEmail(email: string) {
    return await this.db.findOne({ email });
  }
  async find(limit: number) {
    return await this.db.find({}).limit(limit);
  }
}
