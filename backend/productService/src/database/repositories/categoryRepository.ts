import { FilterQuery, Model, UpdateQuery } from "mongoose";
import ICategoryRepository from "../interface/ICategoryRepository";
import categoryModel from "../model/categoryModel";
import ICategory from "../interface/ICategory";

class CategoryRepository implements ICategoryRepository {
  private db: Model<ICategory>;
  constructor() {
    this.db = categoryModel;
  }

  async findAll(condition: FilterQuery<ICategory>): Promise<ICategory[]> {
    return this.db.find(condition).exec();
  }

  async findOne(condition: FilterQuery<ICategory>): Promise<ICategory | null> {
    return this.db.findOne(condition).exec();
  }

  async create(data: ICategory): Promise<ICategory> {
    return await this.db.create(data);
  }

  async updateOne(
    condition: FilterQuery<ICategory>,
    data: UpdateQuery<ICategory>
  ): Promise<ICategory | null> {
    return this.db.findOneAndUpdate(condition, data, { new: true }).exec();
  }
}

export default CategoryRepository;
