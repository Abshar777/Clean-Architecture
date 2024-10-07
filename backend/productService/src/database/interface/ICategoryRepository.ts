import { FilterQuery, UpdateQuery } from "mongoose";
import ICategory from "./ICategory";


export default interface ICategoryRepository {
    findAll(condition:FilterQuery<ICategory>): Promise<ICategory[] | []>;
    findOne(condition:FilterQuery<ICategory>): Promise<ICategory | null>;
    create(data:ICategory): Promise<ICategory >;
    updateOne(condition:FilterQuery<ICategory>,data:UpdateQuery<ICategory>):Promise<ICategory | null>
    
} 