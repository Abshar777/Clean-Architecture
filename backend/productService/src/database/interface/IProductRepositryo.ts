import { FilterQuery, UpdateQuery } from "mongoose";
import IProduct from "./IProduct";

export default interface IProductRepository{
    create(product: IProduct): Promise<IProduct>;
    read(condition: FilterQuery<IProduct>): Promise<IProduct | null>;
    readAll(condition:FilterQuery<IProduct>,limit:number): Promise<IProduct[]>;
    update(condition:FilterQuery<IProduct>,data:UpdateQuery<IProduct>): Promise<IProduct | null>;
    updateMany(condition:FilterQuery<IProduct>,data:UpdateQuery<IProduct>): Promise<IProduct[] | []>
    softDelete(condition:FilterQuery<IProduct>): Promise<void>;
}