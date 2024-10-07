import { Document } from "mongoose";
import ICategory from "./ICategory";

export default interface IProduct extends Document {
    name: string;
    price: number;
    description?: string;
    category: ICategory['_id'];  // Reference to Category
    stock: number;
    createdAt?: Date;
    updatedAt?: Date;
    isDeleat?:boolean
  }